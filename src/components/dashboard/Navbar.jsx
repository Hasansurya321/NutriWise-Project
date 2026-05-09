import { Menu } from 'lucide-react';

import { NavbarActions } from './NavbarActions';
import { SearchInput } from './SearchInput';

export function Navbar({ onMenuClick }) {
  return (
    <header
      className="
        isolate
        sticky top-0 z-40
        border-b border-borderPrimary
        bg-background/95
      "
    >
      <div
        className="
          flex items-center justify-between
          gap-4 px-4 py-4
          sm:px-6 xl:px-8
        "
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="
              flex h-11 w-11 items-center
              justify-center rounded-2xl
              border border-white/5
              bg-card/80 text-textPrimary
              hover:bg-primary/5
              lg:hidden
            "
          >
            <Menu className="h-5 w-5" />
          </button>

          <SearchInput />
        </div>

        <NavbarActions />
      </div>
    </header>
  );
}
