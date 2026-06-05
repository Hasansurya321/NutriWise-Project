import { cn } from '../../utils/cn';

const variants = {
  success: {
    wrapper: 'bg-success/10 text-success border-success/20',
  },
  warning: {
    wrapper: 'bg-warning/10 text-warning border-warning/20',
  },
  danger: {
    wrapper: 'bg-danger/10 text-danger border-danger/20',
  },
  neutral: {
    wrapper: 'bg-white/5 text-textSecondary border-white/10',
  },
};

function resolveVariant(confidence) {
  if (confidence >= 90) return 'success';
  if (confidence >= 70) return 'warning';
  return 'danger';
}

export function ConfidenceBadge({ confidence = 0, className }) {
  const variant = resolveVariant(confidence);

  return <span className={cn('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium', variants[variant].wrapper, className)}>{confidence * 100}% confidence</span>;
}
