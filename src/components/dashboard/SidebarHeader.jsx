import { ChevronLeft, ChevronRight, Leaf } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../utils/cn';

export function SidebarHeader({ collapsed, onToggleCollapsed }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3 px-1">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-borderCard bg-primary/10 text-primary shadow-glow">
          <Leaf className="h-5 w-5" />
        </div>

        <div className={cn('min-w-0', collapsed && 'hidden')}>
          <h1 className="truncate text-sm font-semibold text-textPrimary">NutriWise</h1>
          <p className="truncate text-xs text-textSecondary">Nutrition Dashboard</p>
        </div>
      </div>

      <Button variant="ghost" size="icon" className="hidden lg:inline-flex" onClick={onToggleCollapsed} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </div>
  );
}
