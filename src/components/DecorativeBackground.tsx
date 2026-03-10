import { useTier } from '@/contexts/PerformanceTierContext';
import DecorativeBackgroundFull from './DecorativeBackgroundFull';
import DecorativeBackgroundLite from './DecorativeBackgroundLite';

const DecorativeBackground = () => {
  const { resolvedTier } = useTier();
  return resolvedTier === 'lite' ? <DecorativeBackgroundLite /> : <DecorativeBackgroundFull />;
};

export default DecorativeBackground;
