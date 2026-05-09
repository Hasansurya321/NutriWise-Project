import { cn } from '../../utils/cn';

export function MacroLegendItem({ color, label, value, percentage, className }) {
  return (
    <div className={cn('flex flex-col items-center gap-1 rounded-2xl border border-borderSoft bg-white/3 p-4 text-center', className)}>
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} aria-hidden="true" />

        <span className="text-sm text-textSecondary">{label}</span>
      </div>

      <div className="flex items-end gap-1">
        <span className="text-xl font-semibold tracking-tight text-textPrimary">{value}g</span>

        {percentage ? <span className="pb-0.5 text-xs text-textMuted">{percentage}%</span> : null}
      </div>
    </div>
  );
}
