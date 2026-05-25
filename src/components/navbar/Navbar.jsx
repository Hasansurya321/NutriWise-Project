import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';

import { NavbarActions } from './NavbarActions';
import { SearchInput } from './SearchInput';
import { Button } from '../ui/button';

export function Navbar({ isAuthenticated = false, onMenuClick, collapsed, onToggleCollapsed }) {
  return (
    <header
      className="
        isolate
        sticky top-0 z-40
        border-b border-borderPrimary
        bg-background/95
        duration-200
        backdrop-blur-lg
        h-20
        "

    >
      <div
        className="
        h-full flex items-center justify-between
        gap-4 px-4 py-4
        sm:px-6 xl:px-8
        "
      >
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon" onClick={onToggleCollapsed} className="hidden lg:inline-flex text-textSecondary hover:text-textPrimary" aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>

          <SearchInput />
        </div>

        <NavbarActions isAuthenticated={isAuthenticated} />
      </div>
    </header>
  );
}
