import { useState, useMemo } from 'react';

export type PerformancePreference = 'auto' | 'full' | 'lite';
export type PerformanceTier = 'full' | 'lite';

const STORAGE_KEY = 'perf-mode';

export interface DebugInfo {
  hardwareConcurrency: number | string;
  deviceMemory: number | string;
  devicePixelRatio: number;
  reducedMotion: boolean;
  coarsePointer: boolean;
  hover: boolean;
  isIOS: boolean;
  score: number;
}

function detectCapabilityScore(): number {
  let score = 0;

  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return -3; // strong signal → guarantees LITE
    }
  } catch {}

  try {
    const cores = navigator.hardwareConcurrency ?? 0;
    if (cores >= 6) score += 2;
    else if (cores >= 4) score += 1;
  } catch {}

  try {
    const mem = (navigator as any).deviceMemory ?? 0;
    if (mem >= 4) score += 2;
    else if (mem >= 2) score += 1;
  } catch {}

  try {
    if (window.devicePixelRatio >= 2) score += 1;
  } catch {}

  try {
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) score += 1;
  } catch {}

  try {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (isCoarse && !hasHover) score -= 1;
  } catch {}

  return score;
}

function resolveAutoTier(): PerformanceTier {
  return detectCapabilityScore() >= 3 ? 'full' : 'lite';
}

function getStoredPreference(): PerformancePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'full' || stored === 'lite' || stored === 'auto') return stored;
  } catch {}
  return 'auto';
}

export function usePerformanceTier() {
  const [preference, setPreferenceState] = useState<PerformancePreference>(getStoredPreference);
  const [autoTier] = useState<PerformanceTier>(resolveAutoTier);

  const resolvedTier: PerformanceTier =
    preference === 'full' ? 'full' :
    preference === 'lite' ? 'lite' :
    autoTier;

  const debugInfo: DebugInfo = useMemo(() => {
    try {
      return {
        hardwareConcurrency: navigator.hardwareConcurrency ?? 'N/A',
        deviceMemory: (navigator as any).deviceMemory ?? 'N/A',
        devicePixelRatio: window.devicePixelRatio,
        reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        coarsePointer: window.matchMedia('(pointer: coarse)').matches,
        hover: window.matchMedia('(hover: hover)').matches,
        isIOS: /iPhone|iPad|iPod/.test(navigator.userAgent),
        score: detectCapabilityScore(),
      };
    } catch {
      return {
        hardwareConcurrency: 'N/A',
        deviceMemory: 'N/A',
        devicePixelRatio: 1,
        reducedMotion: false,
        coarsePointer: false,
        hover: true,
        isIOS: false,
        score: 0,
      };
    }
  }, []);

  const setPreference = (p: PerformancePreference) => {
    try {
      if (p === 'auto') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, p);
    } catch {}
    setPreferenceState(p);
  };

  return { preference, resolvedTier, setPreference, debugInfo };
}
