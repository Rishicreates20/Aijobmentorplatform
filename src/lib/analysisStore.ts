import type { AnalysisResult } from './api';

const STORAGE_KEY = 'path4u_analysis_result';

export function saveAnalysisResult(result: AnalysisResult): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {}
}

export function loadAnalysisResult(): AnalysisResult | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as AnalysisResult;
  } catch {
    return null;
  }
}

export function clearAnalysisResult(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasAnalysisResult(): boolean {
  return !!localStorage.getItem(STORAGE_KEY);
}
