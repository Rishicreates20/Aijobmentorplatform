import express from 'express';
import cors from 'cors';
import analyzeRouter from './routes/analyze.js';

const app = express();
const PORT = process.env.BACKEND_PORT || 8000;

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Path4U backend running', agents: ['Analyst (C1)', 'Gap Detection (C2)', 'Synthesizer (C3)'] });
});

app.use('/api/analyze', analyzeRouter);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Path4U backend running on http://0.0.0.0:${PORT}`);
  console.log('Agents: C1 (Analyst), C2 (Gap Detection), C3 (Synthesizer)');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
