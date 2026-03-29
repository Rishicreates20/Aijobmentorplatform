import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function generateFallbackGapData(resumeText, matchData) {
  const text = resumeText.toLowerCase();
  const allTechSkills = ['docker', 'kubernetes', 'aws', 'ci/cd', 'graphql', 'redis', 'system design', 'microservices', 'typescript'];
  const softSkills = ['leadership', 'communication', 'project management', 'agile'];
  const topSkills = (matchData?.candidateProfile?.topSkills || []).map(s => s.toLowerCase());

  const techGaps = allTechSkills
    .filter(s => !text.includes(s) && !topSkills.includes(s))
    .slice(0, 4)
    .map(s => ({
      skill: s.charAt(0).toUpperCase() + s.slice(1),
      priority: ['docker', 'ci/cd', 'aws'].includes(s) ? 'high' : 'medium',
      reason: `Modern ${s.includes('aws') ? 'cloud' : 'engineering'} roles require proficiency in ${s}.`,
    }));

  const softGaps = softSkills
    .filter(s => !text.includes(s))
    .slice(0, 2)
    .map(s => ({
      skill: s.charAt(0).toUpperCase() + s.slice(1),
      priority: 'medium',
      reason: `Senior roles emphasize ${s} for team effectiveness.`,
    }));

  const missingKeywords = allTechSkills
    .filter(s => !text.includes(s))
    .slice(0, 8)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1));

  return {
    techGaps,
    softGaps,
    missingKeywords,
    formatIssues: [
      'Add quantifiable achievements (e.g., "reduced load time by 40%")',
      'Use strong action verbs to start each bullet point',
      'Ensure consistent date formatting throughout',
    ],
    categoryScores: {
      keywords: Math.max(40, (matchData?.atsScore || 65) - 10),
      format: 75,
      content: matchData?.matchScore || 65,
      skills: Math.min(90, (matchData?.matchScore || 65) + 5),
    },
  };
}

export async function runGapDetectionAgent({ resumeText, jobDescription, matchData, sharedState, onChunk }) {
  onChunk({ agent: 'C2', status: 'started', message: 'Gap Detection Agent: Performing intelligent deficit isolation...' });

  const prompt = `You are an expert skills gap analyst.

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription || 'General software engineering role (React, Node.js, TypeScript)'}

EXISTING MATCH ANALYSIS:
${JSON.stringify(matchData, null, 2)}

Identify skill gaps and return a JSON object with:
{
  "techGaps": [
    { "skill": "<skill name>", "priority": "high|medium|low", "reason": "<why it matters for this role>" }
  ],
  "softGaps": [
    { "skill": "<soft skill>", "priority": "high|medium|low", "reason": "<why it matters>" }
  ],
  "missingKeywords": [<array of important keywords missing from resume>],
  "formatIssues": [<array of resume format improvement suggestions>],
  "categoryScores": {
    "keywords": <0-100>,
    "format": <0-100>,
    "content": <0-100>,
    "skills": <0-100>
  }
}

Respond ONLY with valid JSON, no markdown.`;

  try {
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      stream: true,
      temperature: 0.3,
    });

    let fullText = '';
    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content || '';
      fullText += delta;
      if (delta) onChunk({ agent: 'C2', status: 'streaming', delta });
    }

    let gapData = {};
    try {
      const jsonStr = fullText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      gapData = JSON.parse(jsonStr);
    } catch {
      gapData = generateFallbackGapData(resumeText, matchData);
    }

    sharedState.gapData = gapData;
    onChunk({ agent: 'C2', status: 'complete', data: gapData, message: `Gap Detection Agent: Found ${(gapData.techGaps || []).length} tech gaps and ${(gapData.softGaps || []).length} soft skill gaps.` });
    return gapData;
  } catch (err) {
    if (err.status === 429 || err.code === 'insufficient_quota') {
      onChunk({ agent: 'C2', status: 'streaming', delta: ' [Using intelligent estimation mode] ' });
      const gapData = generateFallbackGapData(resumeText, matchData);
      sharedState.gapData = gapData;
      onChunk({ agent: 'C2', status: 'complete', data: gapData, message: `Gap Detection Agent: Found ${gapData.techGaps.length} tech gaps and ${gapData.softGaps.length} soft skill gaps.` });
      return gapData;
    }
    throw err;
  }
}
