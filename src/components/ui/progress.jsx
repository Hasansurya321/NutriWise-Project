import { cn } from '../../utils/cn';

export function Progress({ value = 0, label, className }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn('space-y-2', className)}>
      {label ? (
        <div className="flex items-center justify-between text-xs text-textSecondary">
          <span>{label}</span>
          <span>{safeValue}%</span>
        </div>
      ) : null}

      <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
        <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
