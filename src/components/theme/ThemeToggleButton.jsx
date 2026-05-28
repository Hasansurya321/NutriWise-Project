import { Moon, Sun } from 'lucide-react';

import { useTheme } from '../../hooks/useTheme';
import { Button } from '../ui/button';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
    </Button>
  );
}
