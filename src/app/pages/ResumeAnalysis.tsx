import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import {
  Target,
  Bell,
  LogOut,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Sparkles,
  Brain,
  Zap,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Youtube,
  Code2,
  GraduationCap,
} from 'lucide-react';
import { toast } from 'sonner';
import { startAnalysis, streamAnalysis, type AnalysisResult, type AgentUpdate } from '../../lib/api';
import { saveAnalysisResult } from '../../lib/analysisStore';
import { motion, AnimatePresence } from 'motion/react';

type AgentStatus = 'idle' | 'running' | 'complete';

interface AgentState {
  C1: AgentStatus;
  C2: AgentStatus;
  C3: AgentStatus;
}

const resourceIcon = (type: string) => {
  switch (type) {
    case 'video': return <Youtube className="h-4 w-4 text-red-500" />;
    case 'course': return <GraduationCap className="h-4 w-4 text-blue-500" />;
    case 'article': return <BookOpen className="h-4 w-4 text-green-500" />;
    case 'practice': return <Code2 className="h-4 w-4 text-purple-500" />;
    default: return <ExternalLink className="h-4 w-4" />;
  }
};

const priorityVariant = (p: string): 'destructive' | 'secondary' | 'outline' => {
  if (p === 'high') return 'destructive';
  if (p === 'medium') return 'secondary';
  return 'outline';
};

export function ResumeAnalysis() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [agentStates, setAgentStates] = useState<AgentState>({ C1: 'idle', C2: 'idle', C3: 'idle' });
  const [agentMessages, setAgentMessages] = useState<string[]>([]);
  const [streamingAgent, setStreamingAgent] = useState<string | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      toast.success('Resume uploaded successfully!');
    }
  };

  const handleAnalyze = useCallback(async () => {
    if (!file) {
      toast.error('Please upload a resume first');
      return;
    }

    setAnalyzing(true);
    setResult(null);
    setAgentMessages([]);
    setAgentStates({ C1: 'idle', C2: 'idle', C3: 'idle' });

    try {
      const sessionId = await startAnalysis(file, jobDescription);

      const cleanup = streamAnalysis(
        sessionId,
        (update: AgentUpdate) => {
          if (update.status === 'started' && update.message) {
            setAgentMessages(prev => [...prev, update.message!]);
            const agent = update.agent as keyof AgentState;
            setAgentStates(prev => ({ ...prev, [agent]: 'running' }));
            setStreamingAgent(update.agent);
          } else if (update.status === 'complete' && update.message) {
            setAgentMessages(prev => [...prev, update.message!]);
            const agent = update.agent as keyof AgentState;
            setAgentStates(prev => ({ ...prev, [agent]: 'complete' }));
          }
        },
        (analysisResult) => {
          setResult(analysisResult);
          saveAnalysisResult(analysisResult);
          setAnalyzing(false);
          setStreamingAgent(null);
          toast.success('Analysis complete! Your personalized roadmap is ready.');
        },
        (error) => {
          toast.error(error);
          setAnalyzing(false);
          setStreamingAgent(null);
        }
      );

      cleanupRef.current = cleanup;
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || 'Failed to start analysis');
      setAnalyzing(false);
    }
  }, [file, jobDescription]);

  const agentInfo = [
    { id: 'C1', name: 'Analyst Agent', desc: 'Deep Semantic Fingerprinting', icon: Brain },
    { id: 'C2', name: 'Gap Detection Agent', desc: 'Intelligent Deficit Isolation', icon: Zap },
    { id: 'C3', name: 'Synthesizer Agent', desc: 'Hyper-Personalized Roadmap', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Path4U
            </h1>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/dashboard"><Button variant="ghost">Dashboard</Button></Link>
            <Link to="/jobs"><Button variant="ghost">Jobs</Button></Link>
            <Link to="/roadmap"><Button variant="ghost">Roadmap</Button></Link>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
            </Button>
            <Button variant="ghost" size="icon"><LogOut className="h-5 w-5" /></Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Resume Analysis</h2>
          <p className="text-gray-600">Upload your resume and let our 3-agent AI pipeline give you a full career analysis.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-blue-600" />
                  Upload Resume
                </CardTitle>
                <CardDescription>PDF, DOC, DOCX, or TXT (max 10MB)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('resume-input')?.click()}
                >
                  {file ? (
                    <div className="space-y-1">
                      <FileText className="h-8 w-8 text-blue-600 mx-auto" />
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-600">Click to upload resume</p>
                    </div>
                  )}
                  <input id="resume-input" type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={handleFileChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jd">Job Description (optional)</Label>
                  <Textarea
                    id="jd"
                    placeholder="Paste the job description here for a tailored analysis..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={4}
                    className="text-sm"
                  />
                </div>

                <Button
                  onClick={handleAnalyze}
                  disabled={analyzing || !file}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  {analyzing ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Agents Running...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Analyze with AI
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Agent Pipeline</CardTitle>
                <CardDescription>3-stage multi-agent orchestration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {agentInfo.map(({ id, name, desc, icon: Icon }) => {
                  const status = agentStates[id as keyof AgentState];
                  return (
                    <div key={id} className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                      status === 'running' ? 'border-blue-300 bg-blue-50' :
                      status === 'complete' ? 'border-green-300 bg-green-50' :
                      'border-gray-100 bg-gray-50'
                    }`}>
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        status === 'running' ? 'bg-blue-100' :
                        status === 'complete' ? 'bg-green-100' :
                        'bg-gray-100'
                      }`}>
                        {status === 'running' ? (
                          <span className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full inline-block" />
                        ) : status === 'complete' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <Icon className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">{name}</p>
                        <p className="text-xs text-gray-500">{desc}</p>
                      </div>
                      <Badge variant="outline" className="ml-auto text-xs">{id}</Badge>
                    </div>
                  );
                })}

                {agentMessages.length > 0 && (
                  <div className="mt-3 space-y-1 max-h-32 overflow-y-auto">
                    {agentMessages.map((msg, i) => (
                      <p key={i} className="text-xs text-gray-600 flex items-start gap-1">
                        <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0 text-blue-500" />
                        {msg}
                      </p>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <AnimatePresence>
              {analyzing && !result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-24 space-y-4"
                >
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <Brain className="h-10 w-10 text-white animate-pulse" />
                    </div>
                    <div className="absolute -inset-2 rounded-full border-4 border-blue-200 animate-spin border-t-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">AI Agents Analyzing...</h3>
                  <p className="text-gray-500 text-sm">
                    {streamingAgent ? `Agent ${streamingAgent} is working...` : 'Initializing pipeline...'}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {!analyzing && !result && (
              <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-400">Upload your resume to get started</h3>
                <p className="text-gray-400 text-sm max-w-sm">Our 3-agent AI pipeline will analyze your resume and generate a personalized career roadmap.</p>
              </div>
            )}

            {result && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Tabs defaultValue="overview">
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="gaps">Skill Gaps</TabsTrigger>
                    <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <div className="text-4xl font-bold text-blue-600 mb-1">{result.matchData.matchScore}%</div>
                          <p className="text-sm text-gray-600">Job Match Score</p>
                          <Progress value={result.matchData.matchScore} className="mt-3" />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="pt-6 text-center">
                          <div className="text-4xl font-bold text-purple-600 mb-1">{result.matchData.atsScore}%</div>
                          <p className="text-sm text-gray-600">ATS Score</p>
                          <Progress value={result.matchData.atsScore} className="mt-3" />
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader><CardTitle className="text-base">Candidate Profile</CardTitle></CardHeader>
                      <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div><span className="text-gray-500">Name:</span> <span className="font-medium">{result.matchData.candidateProfile?.name || 'Candidate'}</span></div>
                          <div><span className="text-gray-500">Role:</span> <span className="font-medium">{result.matchData.candidateProfile?.currentRole || 'N/A'}</span></div>
                          <div><span className="text-gray-500">Experience:</span> <span className="font-medium">{result.matchData.candidateProfile?.yearsExperience || 0} yrs</span></div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-2">Top Skills</p>
                          <div className="flex flex-wrap gap-2">
                            {(result.matchData.candidateProfile?.topSkills || []).map(s => (
                              <Badge key={s} variant="secondary">{s}</Badge>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 italic border-l-2 border-blue-200 pl-3">{result.matchData.overallFit}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader><CardTitle className="text-base">Key Strengths</CardTitle></CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {(result.matchData.relevantStrengths || []).map((s, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                              {s}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader><CardTitle className="text-base">Category Scores</CardTitle></CardHeader>
                      <CardContent className="space-y-3">
                        {Object.entries(result.gapData.categoryScores || {}).map(([cat, score]) => (
                          <div key={cat}>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="capitalize text-gray-700">{cat}</span>
                              <span className="font-medium">{score}%</span>
                            </div>
                            <Progress value={score} className="h-2" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {(result.gapData.missingKeywords || []).length > 0 && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                            Missing Keywords
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {result.gapData.missingKeywords.map(k => (
                              <Badge key={k} variant="outline" className="text-orange-600 border-orange-200">{k}</Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="gaps" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Zap className="h-4 w-4 text-purple-600" />
                          Technical Gaps
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {(result.gapData.techGaps || []).map((gap, i) => (
                          <div key={i} className="p-3 border rounded-lg space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">{gap.skill}</span>
                              <Badge variant={priorityVariant(gap.priority)}>{gap.priority}</Badge>
                            </div>
                            <p className="text-xs text-gray-600">{gap.reason}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          Soft Skill Gaps
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {(result.gapData.softGaps || []).map((gap, i) => (
                          <div key={i} className="p-3 border rounded-lg space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">{gap.skill}</span>
                              <Badge variant={priorityVariant(gap.priority)}>{gap.priority}</Badge>
                            </div>
                            <p className="text-xs text-gray-600">{gap.reason}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    {(result.gapData.formatIssues || []).length > 0 && (
                      <Card>
                        <CardHeader><CardTitle className="text-base">Format Improvements</CardTitle></CardHeader>
                        <CardContent className="space-y-2">
                          {result.gapData.formatIssues.map((issue, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm">
                              <AlertCircle className="h-4 w-4 text-orange-400 flex-shrink-0 mt-0.5" />
                              {issue}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="roadmap" className="space-y-4">
                    <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-lg">{result.roadmapData.targetRole}</h3>
                            <p className="text-blue-100 text-sm">{result.roadmapData.estimatedTimeline} to reach your goal</p>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold">{result.roadmapData.overallProgress}%</div>
                            <p className="text-blue-100 text-xs">Current Progress</p>
                          </div>
                        </div>
                        <Progress value={result.roadmapData.overallProgress} className="bg-blue-400 [&>div]:bg-white" />
                      </CardContent>
                    </Card>

                    {result.roadmapData.recruiterInsights && (
                      <Card>
                        <CardHeader><CardTitle className="text-base flex items-center gap-2"><Sparkles className="h-4 w-4 text-purple-500" />Recruiter Insights</CardTitle></CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-700 italic">{result.roadmapData.recruiterInsights}</p>
                        </CardContent>
                      </Card>
                    )}

                    {(result.roadmapData.skills || []).map((skill, i) => (
                      <Card key={i}>
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">{skill.name}</CardTitle>
                            <Badge variant={priorityVariant(skill.priority)}>{skill.priority} priority</Badge>
                          </div>
                          <CardDescription>{skill.whyImportant}</CardDescription>
                          <Progress value={skill.currentProgress} className="h-2" />
                          <p className="text-xs text-gray-500">{skill.currentProgress}% → {skill.targetProgress}%</p>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <p className="text-xs font-semibold text-gray-700 mb-2">Learning Steps</p>
                            {(skill.steps || []).map((step, j) => (
                              <div key={j} className="flex gap-2 mb-2">
                                <span className="h-5 w-5 rounded-full bg-blue-100 text-blue-700 text-xs flex items-center justify-center flex-shrink-0 font-bold">{j + 1}</span>
                                <div>
                                  <p className="text-xs font-medium">{step.title}</p>
                                  <p className="text-xs text-gray-500">{step.description} · {step.timeEstimate}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          {(skill.resources || []).length > 0 && (
                            <div>
                              <p className="text-xs font-semibold text-gray-700 mb-2">Resources</p>
                              <div className="space-y-2">
                                {skill.resources.map((res, j) => (
                                  <a key={j} href={res.url} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-50 transition-colors">
                                    {resourceIcon(res.type)}
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-medium truncate">{res.title}</p>
                                      <p className="text-xs text-gray-400">{res.platform} · {res.duration}</p>
                                    </div>
                                    <ExternalLink className="h-3 w-3 text-gray-300 flex-shrink-0" />
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}

                    {(result.roadmapData.weeklyPlan || []).length > 0 && (
                      <Card>
                        <CardHeader><CardTitle className="text-base">Weekly Plan</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                          {result.roadmapData.weeklyPlan.map((week) => (
                            <div key={week.week} className="p-3 border rounded-lg">
                              <p className="text-sm font-semibold text-blue-700 mb-1">Week {week.week}: {week.focus}</p>
                              <ul className="space-y-1">
                                {(week.goals || []).map((goal, i) => (
                                  <li key={i} className="flex items-center gap-2 text-xs text-gray-600">
                                    <CheckCircle2 className="h-3 w-3 text-green-400" />
                                    {goal}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
