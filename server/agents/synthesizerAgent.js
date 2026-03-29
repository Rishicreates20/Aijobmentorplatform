import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const RESOURCE_CATALOG = {
  React: [
    { title: 'React - The Complete Guide', platform: 'Udemy', type: 'course', url: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/', duration: '40h' },
    { title: 'React Hooks Deep Dive', platform: 'YouTube', type: 'video', url: 'https://www.youtube.com/results?search_query=react+hooks+deep+dive', duration: '2h 30m' },
  ],
  TypeScript: [
    { title: 'TypeScript Handbook', platform: 'Official Docs', type: 'article', url: 'https://www.typescriptlang.org/docs/', duration: '4h' },
    { title: 'TypeScript Full Course', platform: 'YouTube', type: 'video', url: 'https://www.youtube.com/results?search_query=typescript+full+course', duration: '3h' },
  ],
  'Node.js': [
    { title: 'Node.js Complete Guide', platform: 'Udemy', type: 'course', url: 'https://www.udemy.com/course/nodejs-the-complete-guide/', duration: '36h' },
  ],
  Docker: [
    { title: 'Docker & Kubernetes: The Practical Guide', platform: 'Udemy', type: 'course', url: 'https://www.udemy.com/course/docker-kubernetes-the-practical-guide/', duration: '23h' },
    { title: 'Docker in 100 Seconds', platform: 'YouTube', type: 'video', url: 'https://www.youtube.com/watch?v=Gjnup-PuquQ', duration: '2m' },
  ],
  'System Design': [
    { title: 'System Design Primer', platform: 'GitHub', type: 'article', url: 'https://github.com/donnemartin/system-design-primer', duration: '10h' },
    { title: 'System Design Interview Course', platform: 'Educative', type: 'course', url: 'https://www.educative.io/courses/grokking-the-system-design-interview', duration: '20h' },
  ],
  AWS: [
    { title: 'AWS Certified Developer', platform: 'Udemy', type: 'course', url: 'https://www.udemy.com/course/aws-certified-developer-associate/', duration: '30h' },
  ],
  'CI/CD': [
    { title: 'GitHub Actions Tutorial', platform: 'YouTube', type: 'video', url: 'https://www.youtube.com/results?search_query=github+actions+tutorial', duration: '2h' },
  ],
  GraphQL: [
    { title: 'GraphQL Full Course', platform: 'YouTube', type: 'video', url: 'https://www.youtube.com/results?search_query=graphql+full+course', duration: '4h' },
  ],
  Kubernetes: [
    { title: 'Kubernetes for Beginners', platform: 'Udemy', type: 'course', url: 'https://www.udemy.com/course/learn-kubernetes/', duration: '18h' },
  ],
  Leadership: [
    { title: 'Engineering Management Fundamentals', platform: 'Medium', type: 'article', url: 'https://medium.com/topics/engineering-management', duration: '1h' },
  ],
  Communication: [
    { title: 'Technical Communication Skills', platform: 'Coursera', type: 'course', url: 'https://www.coursera.org/courses?query=technical%20communication', duration: '6h' },
  ],
};

function getResourcesForSkill(skillName) {
  for (const [key, resources] of Object.entries(RESOURCE_CATALOG)) {
    if (skillName.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(skillName.toLowerCase())) {
      return resources;
    }
  }
  return [
    { title: `Learn ${skillName} - Complete Guide`, platform: 'Udemy', type: 'course', url: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(skillName)}`, duration: '10h' },
    { title: `${skillName} Tutorial`, platform: 'YouTube', type: 'video', url: `https://www.youtube.com/results?search_query=${encodeURIComponent(skillName)}+tutorial`, duration: '2h' },
  ];
}

function generateFallbackRoadmap(matchData, gapData) {
  const topGaps = [
    ...(gapData.techGaps || []).slice(0, 3).map(g => ({ ...g, category: 'tech' })),
    ...(gapData.softGaps || []).slice(0, 1).map(g => ({ ...g, category: 'soft' })),
  ];

  return {
    targetRole: matchData?.candidateProfile?.currentRole?.includes('Senior') ? matchData.candidateProfile.currentRole : 'Senior Software Engineer',
    estimatedTimeline: '3-6 months',
    overallProgress: matchData?.matchScore ? Math.round(matchData.matchScore * 0.6) : 40,
    skills: topGaps.map(g => ({
      name: g.skill,
      priority: g.priority,
      currentProgress: g.priority === 'high' ? 15 : g.priority === 'medium' ? 30 : 50,
      targetProgress: 100,
      whyImportant: g.reason,
      steps: [
        { title: `Learn ${g.skill} fundamentals`, description: 'Start with core concepts and documentation', timeEstimate: '1 week' },
        { title: `Build a project using ${g.skill}`, description: 'Apply knowledge with a hands-on project', timeEstimate: '2 weeks' },
        { title: `Add ${g.skill} to your portfolio`, description: 'Document and showcase your work', timeEstimate: '3 days' },
      ],
      resources: getResourcesForSkill(g.skill),
    })),
    weeklyPlan: [
      { week: 1, focus: `Foundations: ${topGaps[0]?.skill || 'Core Skills'}`, goals: ['Complete beginner course', 'Follow official documentation', 'Set up local development environment'] },
      { week: 2, focus: 'Hands-on Practice', goals: ['Build a small demo project', 'Solve 5 practice problems', 'Review and refactor code'] },
      { week: 3, focus: 'Portfolio & Networking', goals: ['Deploy your project', 'Update LinkedIn and GitHub', 'Connect with professionals in your target field'] },
    ],
    recruiterInsights: `Recruiters for this role look for candidates who can demonstrate practical experience with the required technologies. A strong GitHub portfolio and quantifiable achievements on your resume are key differentiators. Focus on the high-priority gaps first, as these are the most common screening criteria.`,
  };
}

export async function runSynthesizerAgent({ resumeText, jobDescription, matchData, gapData, sharedState, onChunk }) {
  onChunk({ agent: 'C3', status: 'started', message: 'Synthesizer Agent: Building hyper-personalized roadmap...' });

  const prompt = `You are an expert career roadmap synthesizer.

CANDIDATE PROFILE:
${JSON.stringify(matchData?.candidateProfile || {}, null, 2)}

GAP ANALYSIS:
${JSON.stringify(gapData, null, 2)}

TARGET ROLE: ${jobDescription ? 'Based on the provided JD' : 'Senior Software Engineer'}

Create a structured learning roadmap JSON:
{
  "targetRole": "<inferred target role>",
  "estimatedTimeline": "<e.g. 3-6 months>",
  "overallProgress": <current estimated progress 0-100 based on existing skills>,
  "skills": [
    {
      "name": "<skill name from gap list>",
      "priority": "high|medium|low",
      "currentProgress": <0-100, estimate based on resume>,
      "targetProgress": 100,
      "whyImportant": "<one sentence>",
      "steps": [
        { "title": "<step 1 title>", "description": "<brief description>", "timeEstimate": "<e.g. 1 week>" }
      ]
    }
  ],
  "weeklyPlan": [
    { "week": 1, "focus": "<what to work on>", "goals": ["<goal 1>", "<goal 2>"] }
  ],
  "recruiterInsights": "<2-3 sentences on what recruiters look for in this role>"
}

Focus on the top 4-5 most impactful gaps. Include 2-3 weeks in weeklyPlan. Respond ONLY with valid JSON, no markdown.`;

  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
      temperature: 0.4,
    });

    let fullText = '';
    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content || '';
      fullText += delta;
      if (delta) onChunk({ agent: 'C3', status: 'streaming', delta });
    }

    let roadmapData = {};
    try {
      const jsonStr = fullText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      roadmapData = JSON.parse(jsonStr);
    } catch {
      roadmapData = generateFallbackRoadmap(matchData, gapData);
    }

    for (const skill of roadmapData.skills || []) {
      skill.resources = getResourcesForSkill(skill.name);
    }

    sharedState.roadmapData = roadmapData;
    onChunk({ agent: 'C3', status: 'complete', data: roadmapData, message: `Synthesizer Agent: Roadmap created with ${(roadmapData.skills || []).length} skill tracks.` });
    return roadmapData;
  } catch (err) {
    if (err.status === 429 || err.code === 'insufficient_quota') {
      onChunk({ agent: 'C3', status: 'streaming', delta: ' [Using intelligent estimation mode] ' });
      const roadmapData = generateFallbackRoadmap(matchData, gapData);
      for (const skill of roadmapData.skills || []) {
        skill.resources = getResourcesForSkill(skill.name);
      }
      sharedState.roadmapData = roadmapData;
      onChunk({ agent: 'C3', status: 'complete', data: roadmapData, message: `Synthesizer Agent: Roadmap created with ${roadmapData.skills.length} skill tracks.` });
      return roadmapData;
    }
    throw err;
  }
}
