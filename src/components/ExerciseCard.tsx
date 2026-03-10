import { useState } from 'react';
import { Exercise } from '@/data/exercises';
import { cn } from '@/lib/utils';
import { useTier } from '@/contexts/PerformanceTierContext';

interface ExerciseCardProps {
  exercise: Exercise;
  isDone: boolean;
  onToggleDone: () => void;
  onOpenTimer: () => void;
}

const tagKindClass: Record<string, string> = {
  time: 'bg-[hsl(var(--gold)/0.14)] text-[hsl(43,72%,55%)]',
  reps: 'bg-[hsl(var(--gold)/0.1)] text-[hsl(43,60%,75%)]',
  eye: 'bg-[hsl(160,35%,75%,0.1)] text-[hsl(160,50%,45%)]',
  neck: 'bg-[hsl(var(--destructive)/0.12)] text-[hsl(0,60%,55%)]',
  combo: 'bg-[hsl(80,20%,65%,0.1)] text-[hsl(80,30%,45%)]',
};

const stripeBg: Record<string, string> = {
  eye: 'from-[#2A8FA0] to-[#4A9FB0]',
  neck: 'from-[#C96348] to-[#8A4030]',
  combo: 'from-[#4A8844] to-[#5A9060]',
};

const ExerciseCard = ({ exercise, isDone, onToggleDone, onOpenTimer }: ExerciseCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const { resolvedTier } = useTier();

  return (
    <div
      className={cn(
        'ritual-card relative rounded-[20px] border border-border/50 mb-3.5 transition-all duration-300 cursor-pointer select-none',
        !expanded && (resolvedTier === 'full' ? 'bg-card/80 backdrop-blur-sm' : 'bg-card/90') + ' shadow-[0_2px_12px_rgba(100,60,20,0.08)] overflow-hidden',
        expanded && 'border-border shadow-[0_6px_28px_rgba(100,60,20,0.14)]',
        isDone && 'opacity-[0.44]'
      )}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Color stripe */}
      <div
        className={cn(
          'absolute left-0 top-0 bottom-0 w-[3px] rounded-l-[3px] transition-opacity duration-300 z-[1] bg-gradient-to-b',
          stripeBg[exercise.type],
          expanded ? 'opacity-100' : 'opacity-0'
        )}
      />

      {/* Photo */}
      {exercise.photo && (
        <div className={cn('relative w-full', !expanded && 'overflow-hidden rounded-t-[20px] bg-card/50')}>
          <img
            src={exercise.photo}
            alt={exercise.name}
            className={cn(
              'block transition-all duration-300',
              expanded ? 'mx-auto w-auto' : 'w-full'
            )}
            style={{
              maxHeight: expanded ? '230px' : '210px',
              objectFit: expanded ? 'contain' : 'cover',
              objectPosition: 'top',
            }}
          />
          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
          )}
        </div>
      )}

      {/* Body */}
      <div className={cn(
        'p-4 pb-[18px]',
        expanded && (resolvedTier === 'full' ? 'bg-card/80 backdrop-blur-sm' : 'bg-card/90') + ' rounded-[20px] mt-2 shadow-[0_2px_12px_rgba(100,60,20,0.08)]'
      )}>
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0 mt-0.5">{exercise.icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              'font-display text-base font-semibold leading-tight mb-1 text-foreground',
              isDone && 'line-through decoration-[hsl(var(--gold))]'
            )}>
              {exercise.name}
            </h3>
            <p className="text-[12.5px] text-muted-foreground leading-normal">{exercise.brief}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {exercise.tags.map((tag, i) => (
            <span
              key={i}
              className={cn(
                'text-[10.5px] px-2.5 py-0.5 rounded-[10px] font-medium tracking-wide',
                tagKindClass[tag.kind] || tagKindClass.time
              )}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <button
            className="flex-1 bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(43,72%,45%)] text-[#1C1208] border-none rounded-xl py-2.5 px-3.5 text-[13px] font-semibold font-body flex items-center justify-center gap-1.5 transition-all active:scale-[0.97] active:opacity-85"
            onClick={(e) => { e.stopPropagation(); onOpenTimer(); }}
          >
            ▶ Таймер
          </button>
          <button
            className={cn(
              'rounded-xl py-2.5 px-3.5 text-[13px] font-medium font-body transition-all whitespace-nowrap flex items-center gap-1.5 border',
              isDone
                ? 'bg-[hsl(80,20%,65%,0.15)] border-[hsl(80,20%,65%)] text-[hsl(80,30%,50%)]'
                : 'bg-card/50 border-border text-muted-foreground'
            )}
            onClick={(e) => { e.stopPropagation(); onToggleDone(); }}
          >
            ✓ {isDone ? 'Выполнено' : 'Готово'}
          </button>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="pt-4 border-t border-border mt-3">
            <ol className="list-none space-y-3 counter-reset-steps">
              {exercise.steps.map((step, i) => (
                <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-muted-foreground">
                  <span className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-card/50 border border-border text-[hsl(var(--gold))] text-[10px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: step }} className="[&_strong]:text-foreground" />
                </li>
              ))}
            </ol>

            {exercise.note && (
              <div className="mt-3.5 bg-card/50 border-l-[3px] border-l-destructive rounded-r-[10px] py-3 px-3.5 text-[12.5px] text-muted-foreground leading-relaxed">
                <strong className="text-destructive">{exercise.note.title}</strong> {exercise.note.text}
              </div>
            )}

            {exercise.whyBox && (
              <div className="mt-3.5 bg-[hsl(var(--gold)/0.06)] border border-[hsl(var(--gold)/0.15)] rounded-xl py-3 px-3.5 text-[12.5px] text-[hsl(var(--gold))] leading-relaxed">
                <strong className="text-gold-light">{exercise.whyBox.title}</strong> {exercise.whyBox.text}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseCard;
