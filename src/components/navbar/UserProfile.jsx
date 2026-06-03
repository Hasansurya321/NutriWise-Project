import { ChevronDown } from 'lucide-react';

import { useDropdown } from '../../hooks/useDropdown';
import { UserDropdown } from './UserDropdown';
import { useAuth } from '../../context/AuthContext';

export function UserProfile() {
  const { open, setOpen, ref } = useDropdown();
  const { user } = useAuth();

  const currentUser = user?.user || user;
  const name = currentUser?.fullname || currentUser?.fullName || 'User Name';
  const email = currentUser?.email || 'user@example.com';
  const initials = name.substring(0, 2).toUpperCase();
  const avatarUrl = currentUser?.avatarUrl || "";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="
          flex items-center gap-3
          rounded-3xl border
          border-white/5 bg-card/80
          px-3 py-2 backdrop-blur-xl
          transition-colors duration-200
          hover:border-primary/20
          hover:bg-primary/5
        "
      >
        <div
          className="
            flex h-11 w-11 items-center
            justify-center rounded-2xl
            bg-primary/10 text-primary
            font-semibold
          "
        >
          {
            avatarUrl ? (
              <img
                src={avatarUrl}
                alt={name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              initials
            )
          }

        </div>

        <div className="hidden text-left sm:block">
          <p className="text-sm font-semibold text-textPrimary">{name}</p>

          <p className="text-xs text-textMuted">{email}</p>
        </div>

        <ChevronDown
          className="
            hidden h-4 w-4
            text-textMuted sm:block
          "
        />
      </button>

      <UserDropdown open={open} />
    </div>
  );
}
