import React from 'react';
import { cn } from '../../utils/cn';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-50';

const variants = {
  primary: 'bg-primary text-background shadow-glow hover:bg-primaryHover hover:shadow-card',
  secondary: 'bg-white/5 text-textPrimary hover:bg-white/10 border border-borderCard',
  ghost: 'bg-transparent text-textSecondary hover:bg-white/5 hover:text-textPrimary',
  outline: 'border border-borderCard bg-transparent text-textPrimary hover:bg-white/5',
};

const sizes = {
  default: 'h-11 px-4 py-2',
  sm: 'h-9 px-3',
  lg: 'h-12 px-6',
  icon: 'h-10 w-10',
};

const Button = React.forwardRef(({ className, variant = 'primary', size = 'default', asChild = false, ...props }, ref) => {
  const Comp = asChild ? 'span' : 'button';

  return <Comp ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props} />;
});

Button.displayName = 'Button';

export { Button };
