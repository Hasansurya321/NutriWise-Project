import { useState, useEffect } from 'react';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

import { NavbarActions } from './NavbarActions';
import { Button } from '../ui/button';

export function Navbar({ isAuthenticated = false, onMenuClick, collapsed, onToggleCollapsed }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          if (currentScrollY > lastScrollY && currentScrollY > 80) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }

          lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "isolate sticky top-0 z-40 border-b border-borderPrimary bg-background/95 backdrop-blur-lg h-20 transition-transform duration-300",
        !isVisible && "-translate-y-full"
      )}
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
        </div>

        <NavbarActions isAuthenticated={isAuthenticated} />
      </div>
    </header>
  );
}
