export const insightVariants = {
  success: {
    wrapper: 'border-success/20 bg-success/10 text-success',
    icon: 'bg-success/15 text-success',
    badge: 'success',
    role: 'status',
    label: 'Healthy',
  },
  warning: {
    wrapper: 'border-warning/20 bg-warning/10 text-warning',
    icon: 'bg-warning/15 text-warning',
    badge: 'warning',
    role: 'alert',
    label: 'Attention',
  },
  info: {
    wrapper: 'border-info/20 bg-info/10 text-info',
    icon: 'bg-info/15 text-info',
    badge: 'info',
    role: 'status',
    label: 'Guidance',
  },
  danger: {
    wrapper: 'border-danger/20 bg-danger/10 text-danger',
    icon: 'bg-danger/15 text-danger',
    badge: 'danger',
    role: 'alert',
    label: 'Critical',
  },
};

export function getInsightVariant(variant = 'info') {
  return insightVariants[variant] || insightVariants.info;
}
