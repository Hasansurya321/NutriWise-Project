import { cn } from '../../utils/cn';
import { getIconByName } from '../../utils/iconRegistry';
import { Badge } from '../ui/badge';
import { getInsightVariant } from './ai-insight-variants';

const fallbackIcons = {
  success: 'CheckCircle2',
  warning: 'AlertTriangle',
  info: 'Sparkles',
  danger: 'CircleAlert',
  default: 'Sparkles',
};

export function InsightCard({ variant = 'info', title, message, meta, iconName }) {
  const config = getInsightVariant(variant);
  const Icon = getIconByName(iconName, fallbackIcons[variant] || fallbackIcons.default);

  return (
    <article role={config.role} aria-live={config.role === 'alert' ? 'assertive' : 'polite'} className={cn('rounded-2xl border p-4', 'transition-all duration-200', config.wrapper)}>
      <div className="flex items-start gap-3">
        <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full', config.icon)} aria-hidden="true">
          {Icon ? <Icon className="h-4.5 w-4.5" /> : null}
        </div>

        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-sm font-semibold text-textPrimary">{title}</h4>
            <Badge variant={config.badge}>{config.label}</Badge>
          </div>

          <p className="text-sm leading-relaxed text-textSecondary">{message}</p>

          {meta ? <p className="text-xs text-textMuted">{meta}</p> : null}
        </div>
      </div>
    </article>
  );
}
