import { useState } from 'react';
import { Lock } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '../../utils/cn';

export default function ProfileField({ label, value, isEditing, onChange, type = 'text', isLocked = false }) {
  const [isShaking, setIsShaking] = useState(false);

  const handleInteract = () => {
    if (isLocked) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleChange = (e) => {
    if (!onChange) return;
    const rawValue = e.target.value;
    if (type === 'number') {
      // Allow empty string so user can clear the input
      if (rawValue === '') {
        onChange('');
        return;
      }
      const parsed = Number(rawValue);
      if (!isNaN(parsed)) {
        onChange(parsed);
      }
    } else {
      onChange(rawValue);
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-textPrimary">{label}</label>

      <div className="relative">
        <Input
          type={type}
          value={value ?? ''}
          readOnly={isLocked || !isEditing}
          onChange={handleChange}
          onClick={handleInteract}
          onFocus={handleInteract}
          className={cn(
            isLocked ? 'cursor-not-allowed pr-10' : '',
            !isEditing || isLocked ? 'border-borderPrimary bg-inputReadonly text-textSecondary' : 'border-borderStrong bg-input text-textPrimary',
            isShaking && 'border-destructive bg-destructive/10 text-destructive animate-pulse',
          )}
        />

        {isLocked && (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-textMuted">
            <Lock className="h-4 w-4" />
          </div>
        )}
      </div>

      {isLocked && <p className="mt-1 text-xs text-textMuted">System controlled field</p>}
    </div>
  );
}
