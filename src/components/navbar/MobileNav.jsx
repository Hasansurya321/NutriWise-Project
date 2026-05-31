import { NavLink } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { navigation } from '../../data/navigation';
import { cn } from '../../utils/cn';

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-borderPrimary bg-sidebar/80 px-2 py-2 backdrop-blur-xl pb-safe lg:hidden">
      {navigation.map((item) => {
        const Icon = Icons[item.iconName] || Icons.Circle;

        return (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center justify-center gap-1 rounded-2xl p-2 min-w-[64px] transition-all duration-300',
                isActive
                  ? 'text-primary'
                  : 'text-textSecondary hover:bg-black/5 dark:hover:bg-white/5 hover:text-textPrimary'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={cn(
                    'relative flex items-center justify-center rounded-xl p-1.5 transition-all duration-300',
                    isActive ? 'bg-primary/10 text-primary' : 'bg-transparent'
                  )}
                >
                  <Icon className={cn('h-5 w-5', isActive ? 'stroke-[2.5px]' : 'stroke-2')} />
                </div>
                <span className={cn('text-[10px] font-medium transition-all duration-300', isActive ? 'font-bold' : '')}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
