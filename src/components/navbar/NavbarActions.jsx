import { Link } from 'react-router-dom';

import { NotificationButton } from '../dashboard/NotificationButton';

import { ThemeToggleButton } from '../dashboard/ThemeToggleButton';

import { UserProfile } from '../dashboard/UserProfile';
import { Button } from '../ui/button';

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
          <Link to={'/auth?mode=login'}>
            <Button variant="ghost">
              Login
            </Button>
          </Link>

          <Link to={'/auth?mode=register'}>
            <Button variant="primary">
              Register
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
