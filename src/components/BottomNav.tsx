import { cn } from '@/lib/utils';

export type TabId = 'program' | 'schedule' | 'info';

const tabs: { id: TabId; icon: string; label: string }[] = [
  { id: 'program', icon: '👁️', label: 'Программа' },
  { id: 'schedule', icon: '◷', label: 'Расписание' },
  { id: 'info', icon: '✦', label: 'О курсе' },
];

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const BottomNav = ({ activeTab, onTabChange }: BottomNavProps) => (
  <nav className="flex bg-background/94 backdrop-blur-[20px] border-t border-border/50 pb-[env(safe-area-inset-bottom,0px)] flex-shrink-0 z-50 relative">
    {tabs.map(tab => (
      <button
        key={tab.id}
        className={cn(
          'flex-1 bg-transparent border-none cursor-pointer pt-2.5 pb-1 px-2 flex flex-col items-center gap-0.5 transition-all',
        )}
        onClick={() => onTabChange(tab.id)}
      >
        <span className={cn('text-[22px] leading-none transition-transform', activeTab === tab.id && 'scale-110')}>
          {tab.icon}
        </span>
        <span className={cn(
          'text-[10px] font-medium tracking-wide font-body transition-colors',
          activeTab === tab.id ? 'text-[hsl(var(--gold))]' : 'text-muted-foreground'
        )}>
          {tab.label}
        </span>
        <span className={cn(
          'block w-1 h-1 rounded-full bg-[hsl(var(--gold))] mt-0.5 transition-opacity',
          activeTab === tab.id ? 'opacity-100' : 'opacity-0'
        )} />
      </button>
    ))}
  </nav>
);

export default BottomNav;
