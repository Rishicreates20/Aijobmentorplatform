import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { motion } from 'motion/react';
import {
  Target,
  Bell,
  FileText,
  TrendingUp,
  Briefcase,
  LogOut,
  Upload,
  BookOpen,
  Star,
  Award,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Brain,
} from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { loadAnalysisResult } from '../../lib/analysisStore';
import { supabase } from '../../lib/supabase';
import type { AnalysisResult } from '../../lib/api';
import { fetchJobs } from '../../lib/api';

export function CandidateDashboard() {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [user, setUser] = useState<{ name: string; email: string; type: string } | null>(null);
  const [recentJobs, setRecentJobs] = useState<{ id: number; title: string; company: string; location: string; posted: string }[]>([]);

  useEffect(() => {
    const stored = loadAnalysisResult();
    if (stored) setAnalysis(stored);

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        const meta = data.user.user_metadata || {};
        setUser({
          name: meta.name || data.user.email?.split('@')[0] || 'User',
          email: data.user.email || '',
          type: meta.user_type === 'fresher' ? 'Fresher / Student' : meta.user_type === 'experienced' ? 'Experienced Professional' : 'Job Seeker',
        });
      }
    });

    fetchJobs().then(jobs => setRecentJobs(jobs.slice(0, 3))).catch(() => {});
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const atsScore = analysis?.matchData?.atsScore ?? null;
  const matchScore = analysis?.matchData?.matchScore ?? null;
  const topSkills = analysis?.roadmapData?.skills?.slice(0, 3).map(s => ({ skill: s.name, progress: s.currentProgress })) || [];
  const matchedRoles = analysis
    ? [
        { title: analysis.roadmapData?.targetRole || 'Senior Developer', match: matchScore || 0, company: 'Based on your resume' },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}
              className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Target className="h-6 w-6 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Path4U
            </h1>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/dashboard"><Button variant="ghost" className="hover:bg-blue-50">Dashboard</Button></Link>
            <Link to="/resume-analysis"><Button variant="ghost" className="hover:bg-blue-50">Resume Analysis</Button></Link>
            <Link to="/jobs"><Button variant="ghost" className="hover:bg-blue-50">Jobs</Button></Link>
            <Link to="/roadmap"><Button variant="ghost" className="hover:bg-blue-50">Roadmap</Button></Link>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="relative hover:bg-blue-50">
                <Bell className="h-5 w-5" />
                <motion.span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              </Button>
            </motion.div>
            <Button variant="ghost" size="icon" className="hover:bg-red-50 hover:text-red-600" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </motion.header>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-none border-b shadow-sm">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-900 flex items-center justify-between">
            <span>
              🎉 <strong>{recentJobs.length || 6} jobs</strong> matching your profile!{' '}
              <Link to="/jobs" className="underline font-medium ml-2 hover:text-blue-700">View now</Link>
            </span>
          </AlertDescription>
        </Alert>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <motion.div className="mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, {user?.name || 'there'}! 👋
          </h2>
          <p className="text-gray-600 text-lg">{user?.type}{user?.email ? ` • ${user.email}` : ''}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">

            {/* ATS Score Card — only shows after resume upload */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} whileHover={{ y: -5 }}>
              <Card className="shadow-lg hover:shadow-xl transition-all border-0 bg-white">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <FileText className="h-6 w-6 text-blue-600" />
                        Your ATS Score
                      </CardTitle>
                      <CardDescription className="text-base">
                        {atsScore !== null ? 'Based on your latest resume analysis' : 'Upload your resume to get your score'}
                      </CardDescription>
                    </div>
                    <Link to="/resume-analysis">
                      <Button variant="outline" size="sm" className="shadow-sm">
                        {atsScore !== null ? 'Improve Score' : 'Upload Resume'}
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {atsScore !== null ? (
                    <div className="flex items-center gap-6">
                      <motion.div className="relative" initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}>
                        <div className={`h-36 w-36 rounded-full flex items-center justify-center text-5xl font-bold shadow-lg ${
                          atsScore >= 80 ? 'bg-gradient-to-br from-green-400 to-green-600 text-white' :
                          atsScore >= 60 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
                          'bg-gradient-to-br from-red-400 to-red-600 text-white'
                        }`}>
                          {atsScore}
                        </div>
                        <motion.div className="absolute -top-2 -right-2"
                          animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                          <Sparkles className="h-8 w-8 text-yellow-500" />
                        </motion.div>
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-3 text-lg">
                          {atsScore >= 80 ? 'Great Score!' : atsScore >= 60 ? 'Good Score!' : 'Needs Improvement'} Here's how to improve:
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          {(analysis?.gapData?.formatIssues || [
                            'Add quantifiable achievements',
                            'Include relevant keywords for your target role',
                            'Update your skills section',
                          ]).slice(0, 4).map((tip, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-blue-600">✓</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                        {matchScore !== null && (
                          <div className="mt-3 flex items-center gap-3">
                            <Badge className="bg-blue-100 text-blue-700">Match Score: {matchScore}%</Badge>
                            <Badge className="bg-purple-100 text-purple-700">Target: {analysis?.roadmapData?.targetRole}</Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Brain className="h-10 w-10 text-gray-300" />
                      </div>
                      <h4 className="font-semibold text-gray-600 mb-2">No analysis yet</h4>
                      <p className="text-sm text-gray-400 mb-4">Upload your resume and our AI will calculate your ATS score, match percentage, and skill gaps.</p>
                      <Link to="/resume-analysis">
                        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Resume & Get Score
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Matched Roles */}
            {matchedRoles.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="shadow-lg hover:shadow-xl transition-all border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <Award className="h-6 w-6 text-yellow-500" />
                      Top Role Matches
                    </CardTitle>
                    <CardDescription className="text-base">Roles with highest compatibility based on your resume</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {matchedRoles.map((role, index) => (
                      <motion.div key={index}
                        className="border-2 rounded-xl p-5 hover:border-blue-500 transition-all bg-gradient-to-br from-white to-blue-50"
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }} whileHover={{ scale: 1.02, x: 5 }}>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-lg">{role.title}</h4>
                            <p className="text-sm text-gray-600">{role.company}</p>
                          </div>
                          <Badge className={`shadow-sm ${
                            role.match >= 80 ? 'bg-green-100 text-green-700 border-green-200' :
                            role.match >= 70 ? 'bg-blue-100 text-blue-700 border-blue-200' :
                            'bg-yellow-100 text-yellow-700 border-yellow-200'
                          }`}>
                            {role.match}% Match
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Possibility Meter</span>
                            <span className="font-bold">{role.match}/100</span>
                          </div>
                          <Progress value={role.match} className="h-3 shadow-inner" />
                        </div>
                        <Link to="/roadmap">
                          <Button variant="link" className="px-0 mt-3 text-blue-600 hover:text-blue-700" size="sm">
                            View learning roadmap <ArrowRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Recent Jobs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="shadow-lg hover:shadow-xl transition-all border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-2xl">
                        <Briefcase className="h-6 w-6 text-purple-600" />
                        Recommended Jobs
                      </CardTitle>
                      <CardDescription className="text-base">Jobs matching your profile and preferences</CardDescription>
                    </div>
                    <Link to="/jobs">
                      <Button variant="outline" size="sm" className="shadow-sm">View All</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentJobs.map((job, index) => (
                    <motion.div key={job.id}
                      className="border-2 rounded-xl p-4 hover:border-purple-500 transition-all bg-white hover:shadow-md"
                      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }} whileHover={{ scale: 1.02 }}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{job.title}</h4>
                          <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                          <p className="text-xs text-gray-500 mt-1">{job.posted}</p>
                        </div>
                        <Link to="/jobs">
                          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-md">Apply</Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50">
                <CardHeader><CardTitle className="text-xl">Quick Actions</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <Link to="/resume-analysis">
                    <Button className="w-full justify-start shadow-sm hover:shadow-md" variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      {analysis ? 'Re-analyze Resume' : 'Upload Resume'}
                    </Button>
                  </Link>
                  <Link to="/jobs">
                    <Button className="w-full justify-start shadow-sm hover:shadow-md" variant="outline">
                      <Briefcase className="h-4 w-4 mr-2" />
                      Browse All Jobs
                    </Button>
                  </Link>
                  <Link to="/roadmap">
                    <Button className="w-full justify-start shadow-sm hover:shadow-md" variant="outline">
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Learning Path
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>

            {/* Learning Progress */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Learning Progress
                  </CardTitle>
                  <CardDescription>
                    {topSkills.length > 0 ? 'Skills from your last analysis' : 'Analyze your resume to see your skills'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topSkills.length > 0 ? (
                    <>
                      {topSkills.map((skill, index) => (
                        <motion.div key={index}
                          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">{skill.skill}</span>
                            <span className="text-sm font-bold text-blue-600">{skill.progress}%</span>
                          </div>
                          <Progress value={skill.progress} className="h-2.5 shadow-inner" />
                        </motion.div>
                      ))}
                      <Link to="/roadmap">
                        <Button variant="link" className="px-0 text-sm">
                          View complete roadmap <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-gray-400">No data yet</p>
                      <Link to="/resume-analysis">
                        <Button variant="link" size="sm" className="text-blue-600">Analyze Resume →</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-green-50">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Your Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { label: 'Applications Sent', value: 0 },
                    { label: 'Resume Analyses', value: analysis ? 1 : 0 },
                    { label: 'Skills to Learn', value: analysis?.roadmapData?.skills?.length || 0 },
                    { label: 'Jobs Available', value: recentJobs.length ? 6 : 0 },
                  ].map((stat, index) => (
                    <motion.div key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/50"
                      initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }} whileHover={{ scale: 1.05 }}>
                      <span className="text-sm text-gray-600">{stat.label}</span>
                      <span className="font-bold text-2xl text-blue-600">{stat.value}</span>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
