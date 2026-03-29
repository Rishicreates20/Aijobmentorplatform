# Path4U — AI Job Mentor Platform

## Overview
A full-stack AI-powered career platform. Candidates upload their resume and receive real-time multi-agent analysis including ATS scoring, skill gap detection, and a hyper-personalized learning roadmap. Companies can post jobs and discover matched candidates.

## Architecture
- **Frontend**: React 18 + TypeScript + Vite on port 5000
- **Backend**: Node.js + Express on port 3001 (proxied via Vite `/api`)
- **AI Agents**: OpenAI GPT-4o-mini with SSE streaming

## Multi-Agent Pipeline (from diagram)
- **C1 — Analyst Agent**: Deep semantic fingerprinting → match score, ATS score, candidate profile
- **C2 — Gap Detection Agent**: Intelligent deficit isolation → tech gaps, soft gaps, missing keywords
- **C3 — Synthesizer Agent**: RAG-based roadmap synthesis → personalized learning roadmap with curated resources
- Real-time streaming via Server-Sent Events (SSE)

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite 6, Tailwind CSS 4, Radix UI, Framer Motion, React Router 7
- **Backend**: Node.js (ESM), Express, Multer (file upload), OpenAI SDK
- **Package Manager**: npm

## Project Structure
```
server/
  index.js              — Express server (port 3001)
  agents/
    analystAgent.js     — C1: semantic fingerprinting via OpenAI
    gapDetectionAgent.js — C2: skill gap isolation via OpenAI
    synthesizerAgent.js — C3: roadmap synthesis + resource catalog
    textExtractor.js    — Resume text extraction
  routes/
    analyze.js          — POST /api/analyze/start, GET /api/analyze/stream/:id, GET /api/analyze/jobs

src/
  lib/api.ts            — Frontend API client (fetch + SSE)
  app/
    pages/              — React pages
    components/         — UI components
  styles/               — Tailwind CSS

attached_assets/        — Static image assets
```

## Environment Variables
- `OPENAI_API_KEY` — Required for AI agents (set in Replit Secrets)

## Development
- **Start**: `npm run dev` (runs backend + frontend together)
- **Frontend only**: `npm run dev:frontend`
- **Backend only**: `npm run dev:backend`

## Deployment
- Target: Static site (frontend) + separate backend consideration
- Build command: `npm run build`
- Public directory: `dist/`

## Key Routes
| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/login` | Login (candidate / company) |
| `/signup` | Sign up |
| `/dashboard` | Candidate dashboard |
| `/resume-analysis` | AI resume upload + 3-agent analysis |
| `/jobs` | Job listings (from backend API) |
| `/roadmap` | Learning roadmap |
| `/company` | Company recruiter portal |
