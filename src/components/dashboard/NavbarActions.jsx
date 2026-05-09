import { NotificationButton } from './NotificationButton';

import { ThemeToggleButton } from './ThemeToggleButton';

import { UserProfile } from './UserProfile';

export function NavbarActions() {
  return (
    <div className="flex items-center gap-3">
      <ThemeToggleButton />

      <NotificationButton />

      <UserProfile />
    </div>
  );
}
