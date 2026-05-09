import { cn } from '../../utils/cn';

export function IconButton({ className, size = 'default', variant = 'default', ...props }) {
  const sizeClasses = size === 'sm' ? 'h-9 w-9' : size === 'lg' ? 'h-11 w-11' : 'h-10 w-10';

  const variantClasses = variant === 'ghost' ? 'bg-transparent hover:bg-white/5 text-textSecondary hover:text-textPrimary' : 'bg-white/5 text-textSecondary hover:bg-white/10 hover:text-textPrimary';

  return (
    <button
      type="button"
      className={cn('inline-flex items-center justify-center rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30', sizeClasses, variantClasses, className)}
      {...props}
    />
  );
}
