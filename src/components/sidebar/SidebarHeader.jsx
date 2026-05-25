import { Leaf } from 'lucide-react';
import { cn } from '../../utils/cn';

export function SidebarHeader({ collapsed }) {
  return (
    <div className="flex w-full items-center justify-between lg:justify-start gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-borderCard bg-primary/10 text-primary shadow-glow">
          <Leaf className="h-5 w-5" />
        </div>

        <div className={cn('min-w-0', collapsed && 'lg:hidden')}>
          <h1 className="truncate text-sm font-semibold text-textPrimary">NutriWise</h1>
          <p className="truncate text-xs text-textSecondary">Nutrition Dashboard</p>
        </div>
      </div>
    </div>
  );
}
