import { useState, useEffect, useRef, useCallback } from 'react';

interface TimerSheetProps {
  isOpen: boolean;
  exerciseName: string;
  totalSeconds: number;
  onClose: () => void;
  onComplete: () => void;
}

const CIRC = 2 * Math.PI * 72; // ~452

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

const TimerSheet = ({ isOpen, exerciseName, totalSeconds, onClose, onComplete }: TimerSheetProps) => {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    setTimeLeft(totalSeconds);
    setRunning(false);
    setFinished(false);
  }, [totalSeconds, isOpen]);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            setFinished(true);
            setTimeout(() => { onComplete(); onClose(); }, 900);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const toggle = useCallback(() => {
    if (finished) return;
    if (running) {
      clearInterval(intervalRef.current!);
      setRunning(false);
    } else {
      if (timeLeft <= 0) setTimeLeft(totalSeconds);
      setRunning(true);
    }
  }, [running, finished, timeLeft, totalSeconds]);

  if (!isOpen) return null;

  const offset = CIRC * (1 - timeLeft / totalSeconds);

  return (
    <div
      className="fixed inset-0 bg-[rgba(60,30,10,0.55)] backdrop-blur-[16px] z-[200] flex items-end justify-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-card border border-border rounded-t-[28px] px-7 pb-7 pt-2.5 w-full max-w-[480px] text-center animate-[sheetUp_0.3s_cubic-bezier(.32,.72,0,1)]">
        <div className="w-[38px] h-1 rounded-sm bg-border mx-auto mb-6" />

        <h3 className="font-display text-xl text-foreground mb-7 leading-tight">{exerciseName}</h3>

        <div className="w-40 h-40 mx-auto mb-7 relative flex items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="72" fill="none" stroke="hsl(var(--card))" strokeWidth="6" />
            <circle
              cx="80" cy="80" r="72"
              fill="none"
              stroke={finished ? 'hsl(80, 30%, 50%)' : 'hsl(var(--gold))'}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={offset}
              className="transition-[stroke-dashoffset] duration-1000 linear"
            />
          </svg>
          <span className="text-[46px] font-light tracking-tighter text-foreground font-body">
            {fmt(timeLeft)}
          </span>
        </div>

        <div className="flex gap-3">
          <button
            className="bg-card/50 border border-border text-muted-foreground rounded-[14px] py-3.5 px-5 text-sm font-semibold font-body transition-all active:scale-[0.97]"
            onClick={onClose}
          >
            ✕
          </button>
          <button
            className="flex-1 bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(43,72%,45%)] text-[#1C1208] border-none rounded-[14px] py-3.5 px-5 text-base font-bold font-body transition-all active:scale-[0.97]"
            onClick={toggle}
          >
            {finished ? '✓ Выполнено' : running ? '⏸ Пауза' : timeLeft < totalSeconds ? '▶ Продолжить' : '▶ Старт'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerSheet;
