import { cn } from '../../utils/cn';

export function ChartTooltip({ active, payload, label, labelFormatter, valueSuffix = '' }) {
  if (!active || !payload?.length) {
    return null;
  }

  const item = payload[0];

  return (
    <div className={cn('min-w-[140px] rounded-2xl border border-white/5 bg-card px-4 py-3 shadow-card backdrop-blur-xl')}>
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wide text-textMuted">{labelFormatter ? labelFormatter(label) : label}</p>

        <div className="flex items-end gap-1">
          <span className="text-xl font-semibold tracking-tight text-textPrimary">{item.value}</span>

          {valueSuffix ? <span className="pb-0.5 text-xs text-textSecondary">{valueSuffix}</span> : null}
        </div>
      </div>
    </div>
  );
}
