import { Link } from 'react-router-dom';

import { NotificationButton } from './NotificationButton';

import { ThemeToggleButton } from './ThemeToggleButton';

import { UserProfile } from './UserProfile';

export function NavbarActions({ isAuthenticated = false }) {
  return (
    <div className="flex items-center gap-3">
      <ThemeToggleButton />

      {isAuthenticated ? (
        <>
          <NotificationButton />

          <UserProfile />
        </>
      ) : (
        <div className="flex items-center gap-2">
          <Link className="rounded-xl px-3 py-2 text-sm font-medium text-textSecondary transition-colors duration-200 hover:bg-white/5 hover:text-textPrimary" to="/auth">
            Login
          </Link>

          <Link className="rounded-xl bg-primary px-3 py-2 text-sm font-medium text-background shadow-glow transition-all duration-200 hover:bg-primaryHover" to="/auth?mode=register">
            Register
          </Link>
        </div>
      )}
    </div>
  );
}
