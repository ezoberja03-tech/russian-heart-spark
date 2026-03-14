import { useState, useCallback, useRef } from 'react';
import DecorativeBackground from '@/components/DecorativeBackground';
import ExerciseCard from '@/components/ExerciseCard';
import TimerSheet from '@/components/TimerSheet';
import BottomNav, { TabId } from '@/components/BottomNav';
import logo from '@/assets/logo.png';
import { exercises, sections, schedule, infoBlocks } from '@/data/exercises';
import { useTier } from '@/contexts/PerformanceTierContext';
import type { PerformancePreference } from '@/hooks/usePerformanceTier';

const TOTAL = exercises.length;

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>('program');
  const { preference, resolvedTier, setPreference, debugInfo } = useTier();
  const [doneSet, setDoneSet] = useState<Set<number>>(new Set());
  const [timerOpen, setTimerOpen] = useState(false);
  const [timerExIdx, setTimerExIdx] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleDone = useCallback((id: number) => {
    setDoneSet((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);else
      next.add(id);
      return next;
    });
  }, []);

  const openTimer = useCallback((idx: number) => {
    setTimerExIdx(idx);
    setTimerOpen(true);
  }, []);

  const handleTabChange = useCallback((tab: TabId) => {
    setActiveTab(tab);
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const completedCount = doneSet.size;
  const progressPct = Math.round(completedCount / TOTAL * 100);

  const completeAll = () => {
    const all = new Set<number>();
    exercises.forEach((e) => all.add(e.id));
    setDoneSet(all);
  };

  return (
    <div className="fixed inset-0 flex flex-col z-[1] overflow-hidden">
      <DecorativeBackground />

      {/* Content */}
      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto overflow-x-hidden w-full scrollbar-hide"
        style={{ WebkitOverflowScrolling: 'touch' }}>
        
        {/* ═══ PROGRAM TAB ═══ */}
        {activeTab === 'program' &&
        <div className="px-3.5 pb-24">
            {/* Header */}
            <div className="pt-6 pb-5 text-center border-solid border-primary">
              {/* Logo */}
              <div className="w-[76px] h-[76px] mx-auto mb-4 relative">
                <div className="absolute -inset-1.5 rounded-full border border-dashed border-[hsl(var(--gold)/0.25)] animate-spin" style={{ animationDuration: '24s' }} />
                <div className="w-[76px] h-[76px] rounded-full bg-card/70 border-[1.5px] border-destructive/30 overflow-hidden flex items-center justify-center shadow-[0_4px_20px_rgba(217,119,87,0.2),0_1px_4px_rgba(0,0,0,0.08)] relative z-[1]">
                  <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>

              <span className="inline-block text-[9px] tracking-[3.5px] uppercase text-[hsl(var(--gold))] border border-[hsl(var(--gold)/0.28)] px-4 py-1 rounded-full mb-3.5 font-medium">
                Ежедневный ритуал
              </span>

              <h1 className="font-display text-[28px] font-bold leading-tight mb-2 bg-gradient-to-br from-gold-light via-gold to-destructive bg-clip-text text-transparent bg-mint">ЗРЕНИЕ В ФОКУСЕ
              </h1>
              <p className="leading-relaxed mb-5 max-w-[290px] mx-auto text-sm font-mono font-medium text-primary">комплекс упражнений для глаз


начните свой путь к ясному взгляду

<br />маленькими шагами к лёгкости
              </p>

              {/* Progress */}
              <div className="bg-card/50 rounded-md h-[3px] mb-1.5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[hsl(var(--gold))] to-gold rounded-md transition-[width] duration-500 ease-out" style={{ width: `${progressPct}%` }} />
              
              </div>
              <p className="text-[11px] text-muted-foreground tracking-wide text-center">
                {TOTAL} упражнений
              </p>
            </div>

            {/* Exercise sections */}
            {sections.map((section, si) => <div key={si}>
                <div className="flex items-center gap-3 mt-7 mb-3.5 opacity-85">
                  <span className="text-[9px] tracking-[3.5px] uppercase text-[hsl(var(--gold))] font-semibold whitespace-nowrap">
                    {section.label}
                  </span>
                  <span className="flex-1 h-px bg-gradient-to-r from-border to-transparent" />
                </div>
                {section.exerciseIds.map((id) => {const ex = exercises[id];
              return (
                <ExerciseCard
                  key={id}
                  exercise={ex}
                  isDone={doneSet.has(id)}
                  onToggleDone={() => toggleDone(id)}
                  onOpenTimer={() => openTimer(id)} />);


            })}
              </div>
          )}

            {/* Complete all */}
            <button
            className="block w-full py-4 mt-6 bg-gradient-to-br from-[hsl(var(--gold)/0.11)] to-[hsl(var(--gold)/0.06)] border border-border rounded-2xl text-[hsl(var(--gold))] text-[15px] font-semibold font-body cursor-pointer transition-all tracking-wide active:from-[hsl(var(--gold)/0.2)]"
            onClick={completeAll}>
            
              ✨ Завершить все
            </button>

            {completedCount === TOTAL &&
          <div className="text-center py-9 px-6 bg-card border border-border rounded-[20px] mt-5">
                <div className="text-[52px] mb-2.5">🎉</div>
                <h2 className="font-display text-2xl mb-2 bg-gradient-to-br from-gold-light to-gold bg-clip-text text-transparent">
                  Ритуал выполнен!
                </h2>
                <p className="text-muted-foreground text-[13px] leading-relaxed">
                  Отличная работа! Каждый день — это вклад<br />в здоровье глаз и шеи.
                </p>
              </div>
          }
          </div>
        }

        {/* ═══ SCHEDULE TAB ═══ */}
        {activeTab === 'schedule' &&
        <div className="px-3.5 pb-24">
            <div className="pt-7 pb-5 text-center">
              <span className="inline-block text-[9px] tracking-[3.5px] uppercase text-[hsl(var(--gold))] border border-[hsl(var(--gold)/0.28)] px-4 py-1 rounded-full mb-3.5 font-medium">
                Распорядок дня
              </span>
              <h2 className="font-display text-[28px] font-bold bg-gradient-to-br from-gold-light to-gold bg-clip-text text-transparent">
                Расписание
              </h2>
            </div>

            {schedule.map((block, i) =>
          <div key={i} className="bg-card border border-border rounded-[20px] p-5 mb-3">
                <div className="text-[9px] tracking-[3px] uppercase text-[hsl(var(--gold))] font-semibold mb-2">
                  {block.time}
                </div>
                <h3 className="font-display text-xl mb-3 text-foreground">{block.title}</h3>
                <ul className="list-none text-[13px] text-muted-foreground leading-[2.1]">
                  {block.items.map((item, j) =>
              <li key={j}><span className="text-[hsl(var(--gold))]">→ </span>{item}</li>
              )}
                </ul>
                <div className="text-xs text-[hsl(var(--gold))] mt-2.5 font-medium">⏱ {block.total}</div>
              </div>
          )}

            {/* Summary */}
            <div className="bg-card border-2 border-border rounded-[20px] p-5">
              <div className="text-[9px] tracking-[3px] uppercase text-[hsl(var(--gold))] font-semibold mb-2">
                Итого в день
              </div>
              <h3 className="font-display text-xl bg-gradient-to-br from-gold-light to-gold bg-clip-text text-transparent mb-3">
                ~46 минут
              </h3>
              <ul className="list-none text-[13px] text-muted-foreground leading-[2.1]">
                <li><span className="text-[hsl(var(--gold))]">→ </span>~20 мин — прогулка (совмещается с обедом)</li>
                <li><span className="text-[hsl(var(--gold))]">→ </span>~6 мин — микропаузы за экраном</li>
                <li><span className="text-[hsl(var(--gold))]">→ </span>~20 мин — активные упражнения утром и вечером</li>
              </ul>
            </div>
          </div>
        }

        {/* ═══ INFO TAB ═══ */}
        {activeTab === 'info' &&
        <div className="px-3.5 pb-24">
            <div className="pt-7 pb-5 text-center">
              <span className="inline-block text-[9px] tracking-[3.5px] uppercase text-[hsl(var(--gold))] border border-[hsl(var(--gold)/0.28)] px-4 py-1 rounded-full mb-3.5 font-medium">
                Наука & Практика
              </span>
              <h2 className="font-display text-[28px] font-bold bg-gradient-to-br from-gold-light to-destructive bg-clip-text text-transparent">
                О курсе
              </h2>
            </div>

            {infoBlocks.map((block, i) =>
          <div
            key={i}
            className={`bg-card border rounded-[20px] p-5 mb-3 ${block.color === 'warning' ? 'border-destructive/20' : 'border-border'}`}>

                <div className={`text-[9px] tracking-[3px] uppercase font-semibold mb-2 ${block.color === 'warning' ? 'text-destructive' : block.color === 'neck' ? 'text-destructive' : 'text-[hsl(160,50%,45%)]'}`}>
                  {block.label}
                </div>
                <h3 className="font-display text-lg mb-3 text-foreground">{block.title}</h3>
                <p
              className="text-[13px] text-muted-foreground leading-[1.85] [&_strong]:text-[hsl(var(--gold))]"
              dangerouslySetInnerHTML={{ __html: block.text }} />

              </div>
          )}

            {/* Performance mode settings */}
            <div className="bg-card border border-border rounded-[20px] p-5 mb-3 mt-2">
              <div className="text-[9px] tracking-[3px] uppercase text-[hsl(var(--gold))] font-semibold mb-3">
                Режим отображения
              </div>
              <div className="flex gap-2 mb-3">
                {([['auto', '🤖 Авто'], ['full', '✨ Полный'], ['lite', '⚡ Экономный']] as [PerformancePreference, string][]).map(([p, label]) => (
                  <button
                    key={p}
                    onClick={() => setPreference(p)}
                    className={`flex-1 py-2 px-1 rounded-xl text-[12px] font-semibold font-body border transition-all ${
                      preference === p
                        ? 'bg-[hsl(var(--gold))] text-[#1C1208] border-[hsl(var(--gold))]'
                        : 'bg-card/50 border-border text-muted-foreground'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-[11.5px] text-muted-foreground leading-relaxed">
                {preference === 'auto'
                  ? `Авто: ${resolvedTier === 'full' ? 'FULL' : 'LITE'} (счёт ${debugInfo.score}/${debugInfo.score < 0 ? '' : ''})`
                  : preference === 'full'
                  ? 'Принудительно: полный режим'
                  : 'Принудительно: экономный режим'}
              </p>
              <details className="mt-2">
                <summary className="text-[11px] text-muted-foreground/60 cursor-pointer select-none">
                  Подробности детекции
                </summary>
                <div className="mt-2 text-[11px] text-muted-foreground/70 space-y-0.5 font-mono">
                  <div>hardwareConcurrency: {debugInfo.hardwareConcurrency ?? '—'}</div>
                  <div>deviceMemory: {debugInfo.deviceMemory ?? '—'} GB</div>
                  <div>devicePixelRatio: {debugInfo.devicePixelRatio}</div>
                  <div>reducedMotion: {String(debugInfo.reducedMotion)}</div>
                  <div>coarsePointer: {String(debugInfo.coarsePointer)}</div>
                  <div>iOS: {String(debugInfo.isIOS)}</div>
                  <div className="mt-1 font-semibold text-foreground/60">итого: {debugInfo.score} → {resolvedTier.toUpperCase()}</div>
                </div>
              </details>
            </div>
          </div>
        }
      </div>

      {/* Bottom Nav */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Timer Sheet */}
      {timerExIdx !== null &&
      <TimerSheet
        isOpen={timerOpen}
        exerciseName={exercises[timerExIdx].name}
        totalSeconds={exercises[timerExIdx].timerSeconds}
        onClose={() => setTimerOpen(false)}
        onComplete={() => {
          if (timerExIdx !== null) toggleDone(timerExIdx);
        }} />

        };
{/* Disclaimer */}
<div className="mt-12 px-4 py-4 border border-yellow-500/30 rounded-lg bg-yellow-500/5 max-w-2xl mx-auto text-center">
  <p className="text-sm text-muted-foreground">
    <span className="font-medium text-yellow-600 dark:text-yellow-400">⚠️ Важно</span>
    <br />
    Материалы носят исключительно информационный характер и не являются медицинской рекомендацией. Перед выполнением упражнений проконсультируйтесь с офтальмологом.
  </p>
</div>
      
      }
    </div>);



export default Index;
