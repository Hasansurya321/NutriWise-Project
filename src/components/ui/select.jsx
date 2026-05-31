import { cn } from '../../utils/cn';

function Select({ className, options = [], placeholder = 'Pilih...', value, onChange, error, ...props }) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          'h-14 w-full min-w-0 rounded-2xl border bg-input px-5 py-1 text-base text-textPrimary outline-none transition-colors duration-200',
          'hover:border-borderStrong hover:bg-inputHover',
          'focus:border-primary/50 focus:bg-background focus:ring-1 focus:ring-primary/15',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50',
          'appearance-none',
          !value && 'text-textMuted',
          error && 'border-danger/50 focus:border-danger focus:ring-danger/15',
          className,
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => {
          const optionValue = typeof opt === 'string' ? opt : opt.value;
          const optionLabel = typeof opt === 'string' ? opt : opt.label;

          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>

      {/* Custom dropdown arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-textMuted">
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}

export { Select };
