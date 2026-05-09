import React from 'react';
import { cn } from '../../utils/cn';

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-xl border border-borderPrimary bg-input px-4 text-sm text-textPrimary placeholder:text-textMuted transition-colors focus:border-borderActive focus:bg-inputActive focus:outline-none focus:ring-2 focus:ring-primary/20 hover:bg-inputHover',
        className,
      )}
      {...props}
    />
  );
});

Input.displayName = 'Input';
