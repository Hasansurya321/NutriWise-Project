import React from 'react';
import { cn } from '../../utils/cn';

const variants = {
  default: 'bg-white/5 text-textSecondary border border-borderCard',
  success: 'bg-success/10 text-success border border-success/20',
  warning: 'bg-warning/10 text-warning border border-warning/20',
  danger: 'bg-danger/10 text-danger border border-danger/20',
  info: 'bg-info/10 text-info border border-info/20',
  primary: 'bg-primary/10 text-primary border border-primary/20',
};

export function Badge({ className, variant = 'default', ...props }) {
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', variants[variant], className)} {...props} />;
}
