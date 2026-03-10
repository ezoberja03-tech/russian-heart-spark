import { createContext, useContext, ReactNode } from 'react';
import { usePerformanceTier, PerformancePreference, PerformanceTier, DebugInfo } from '@/hooks/usePerformanceTier';

interface PerformanceTierContextValue {
  preference: PerformancePreference;
  resolvedTier: PerformanceTier;
  setPreference: (p: PerformancePreference) => void;
  debugInfo: DebugInfo;
}

const PerformanceTierContext = createContext<PerformanceTierContextValue | null>(null);

export const PerformanceTierProvider = ({ children }: { children: ReactNode }) => {
  const value = usePerformanceTier();
  return (
    <PerformanceTierContext.Provider value={value}>
      {children}
    </PerformanceTierContext.Provider>
  );
};

export const useTier = () => {
  const ctx = useContext(PerformanceTierContext);
  if (!ctx) throw new Error('useTier must be used within PerformanceTierProvider');
  return ctx;
};
