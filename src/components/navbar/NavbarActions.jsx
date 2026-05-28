import { Link } from 'react-router-dom';

import { NotificationButton } from '../dashboard/NotificationButton';

import { ThemeToggleButton } from '../theme/ThemeToggleButton';

import { UserProfile } from './UserProfile';
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
            <Button variant="outline" className="font-semibold">
              Login
            </Button>
          </Link>

          <Link to={'/auth?mode=register'}>
            <Button>
              Register
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
