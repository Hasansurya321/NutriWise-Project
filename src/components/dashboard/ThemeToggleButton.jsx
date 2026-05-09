import { Moon, Sun } from 'lucide-react';

import { useTheme } from '../../hooks/useTheme';

export function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        flex h-11 w-11
        items-center justify-center
        rounded-2xl border
        border-borderPrimary
        bg-card/80
        hover:bg-primary/5
      "
    >
      {isDark ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
    </button>
  );
}
