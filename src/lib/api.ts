const API_BASE = '/api';

export interface AnalysisResult {
  matchData: {
    matchScore: number;
    atsScore: number;
    relevantStrengths: string[];
    candidateProfile: {
      name: string;
      currentRole: string;
      yearsExperience: number;
      topSkills: string[];
    };
    keywordMatches: string[];
    overallFit: string;
  };
  gapData: {
    techGaps: Array<{ skill: string; priority: string; reason: string }>;
    softGaps: Array<{ skill: string; priority: string; reason: string }>;
    missingKeywords: string[];
    formatIssues: string[];
    categoryScores: { keywords: number; format: number; content: number; skills: number };
  };
  roadmapData: {
    targetRole: string;
    estimatedTimeline: string;
    overallProgress: number;
    skills: Array<{
      name: string;
      priority: string;
      currentProgress: number;
      targetProgress: number;
      whyImportant: string;
      steps: Array<{ title: string; description: string; timeEstimate: string }>;
      resources: Array<{ title: string; platform: string; type: string; url: string; duration: string }>;
    }>;
    weeklyPlan: Array<{ week: number; focus: string; goals: string[] }>;
    recruiterInsights: string;
  };
}

export interface AgentUpdate {
  agent: string;
  status: 'started' | 'streaming' | 'complete';
  message?: string;
  delta?: string;
  data?: unknown;
}

export async function startAnalysis(file: File, jobDescription?: string): Promise<string> {
  const formData = new FormData();
  formData.append('resume', file);
  if (jobDescription) formData.append('jobDescription', jobDescription);

  const res = await fetch(`${API_BASE}/analyze/start`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to start analysis');
  }

  const data = await res.json();
  return data.sessionId;
}

export function streamAnalysis(
  sessionId: string,
  onUpdate: (update: AgentUpdate) => void,
  onComplete: (result: AnalysisResult) => void,
  onError: (error: string) => void
): () => void {
  const es = new EventSource(`${API_BASE}/analyze/stream/${sessionId}`);

  es.addEventListener('agent-update', (e) => {
    try {
      const data = JSON.parse(e.data);
      onUpdate(data);
    } catch {}
  });

  es.addEventListener('complete', (e) => {
    try {
      const data = JSON.parse(e.data);
      onComplete(data as AnalysisResult);
    } catch {}
    es.close();
  });

  es.addEventListener('error', (e) => {
    try {
      const data = JSON.parse((e as MessageEvent).data);
      onError(data.message || 'Analysis failed');
    } catch {
      onError('Connection error');
    }
    es.close();
  });

  es.onerror = () => {
    onError('Lost connection to analysis server');
    es.close();
  };

  return () => es.close();
}

export async function fetchJobs() {
  const res = await fetch(`${API_BASE}/analyze/jobs`);
  if (!res.ok) throw new Error('Failed to fetch jobs');
  const data = await res.json();
  return data.jobs;
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return res.ok;
  } catch {
    return false;
  }
}
