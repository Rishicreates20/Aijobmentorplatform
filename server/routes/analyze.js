import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extractTextFromFile } from '../agents/textExtractor.js';
import { runAnalystAgent } from '../agents/analystAgent.js';
import { runGapDetectionAgent } from '../agents/gapDetectionAgent.js';
import { runSynthesizerAgent } from '../agents/synthesizerAgent.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const sessions = new Map();

router.post('/start', upload.single('resume'), async (req, res) => {
  try {
    const file = req.file;
    const jobDescription = req.body.jobDescription || '';

    if (!file) {
      return res.status(400).json({ error: 'Resume file is required' });
    }

    const sessionId = uuidv4();
    const resumeText = await extractTextFromFile(file.buffer, file.mimetype, file.originalname);

    sessions.set(sessionId, {
      resumeText,
      jobDescription,
      sharedState: {},
      status: 'pending',
      events: [],
    });

    res.json({ sessionId, message: 'Analysis session created. Connect to /api/analyze/stream/:sessionId' });
  } catch (err) {
    console.error('Error starting analysis:', err);
    res.status(500).json({ error: 'Failed to start analysis' });
  }
});

router.get('/stream/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  const session = sessions.get(sessionId);

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.flushHeaders();

  const send = (eventType, data) => {
    res.write(`event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  const onChunk = (chunk) => {
    send('agent-update', chunk);
  };

  try {
    send('status', { message: 'Pipeline started — 3 agents initializing...', stage: 'init' });

    const { resumeText, jobDescription, sharedState } = session;

    const matchData = await runAnalystAgent({ resumeText, jobDescription, sharedState, onChunk });

    const gapData = await runGapDetectionAgent({ resumeText, jobDescription, matchData, sharedState, onChunk });

    const roadmapData = await runSynthesizerAgent({ resumeText, jobDescription, matchData, gapData, sharedState, onChunk });

    send('complete', {
      matchData,
      gapData,
      roadmapData,
      message: 'Analysis complete!',
    });

    sessions.delete(sessionId);
    res.end();
  } catch (err) {
    console.error('Pipeline error:', err);
    send('error', { message: err.message || 'Analysis failed' });
    res.end();
  }
});

router.get('/jobs', (req, res) => {
  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Google',
      logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      location: 'Mountain View, CA',
      type: 'Full-time',
      salary: '$140k - $180k',
      posted: '2 days ago',
      description: 'Join our team to build next-generation web experiences used by billions. You will work on core UI infrastructure and customer-facing products.',
      skills: ['React', 'TypeScript', 'Next.js', 'Web Performance'],
      matchScore: 0,
      applicants: 45,
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'Meta',
      logo: '',
      location: 'Remote',
      type: 'Full-time',
      salary: '$130k - $170k',
      posted: '3 days ago',
      description: 'Build scalable applications that impact billions of users worldwide. Work across the full stack from database to UI.',
      skills: ['React', 'Node.js', 'GraphQL', 'PostgreSQL'],
      matchScore: 0,
      applicants: 67,
    },
    {
      id: 3,
      title: 'React Developer',
      company: 'Amazon',
      logo: '',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$120k - $160k',
      posted: '5 days ago',
      description: 'Work on AWS console and internal tools used by thousands of engineers. Strong focus on accessibility and performance.',
      skills: ['React', 'Redux', 'AWS', 'TypeScript'],
      matchScore: 0,
      applicants: 89,
    },
    {
      id: 4,
      title: 'Software Engineer - Frontend',
      company: 'Stripe',
      logo: '',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$150k - $200k',
      posted: '1 week ago',
      description: 'Build the financial infrastructure for the internet. You will design and implement developer-facing APIs and dashboards.',
      skills: ['TypeScript', 'React', 'Node.js', 'API Design'],
      matchScore: 0,
      applicants: 34,
    },
    {
      id: 5,
      title: 'Frontend Engineer',
      company: 'Airbnb',
      logo: '',
      location: 'Remote',
      type: 'Full-time',
      salary: '$135k - $175k',
      posted: '4 days ago',
      description: 'Create magical travel experiences through great design and engineering. Work on booking flows used by millions.',
      skills: ['React', 'GraphQL', 'CSS-in-JS', 'Accessibility'],
      matchScore: 0,
      applicants: 52,
    },
    {
      id: 6,
      title: 'Backend Engineer - Node.js',
      company: 'Shopify',
      logo: '',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120k - $155k',
      posted: '6 days ago',
      description: 'Power commerce for millions of merchants worldwide. Build high-throughput APIs and microservices at scale.',
      skills: ['Node.js', 'Ruby', 'GraphQL', 'Redis', 'Kubernetes'],
      matchScore: 0,
      applicants: 78,
    },
  ];
  res.json({ jobs });
});

export default router;
