import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '../../utils/cn';

export function SearchInput({ className, wrapperClassName, placeholder = 'Search nutrition data...', ...props }) {
  return (
    <div className={cn('relative w-full max-w-md', wrapperClassName)}>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-textMuted" />
      <Input
        className={cn('h-11 rounded-full border-borderCard bg-white/5 pl-11 pr-4 text-sm text-textPrimary backdrop-blur-sm placeholder:text-textMuted focus:border-borderActive focus:ring-2 focus:ring-primary/20', className)}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
