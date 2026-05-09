import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';

export function SidebarNavItem({ item, collapsed = false, onClick }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onClick}
      aria-label={collapsed ? item.name : undefined}
      className={({ isActive }) =>
        cn(
          'group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30',
          isActive ? 'bg-primary text-background shadow-glow' : 'text-textSecondary hover:bg-white/5 hover:text-textPrimary',
        )
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className={cn('truncate', collapsed && 'hidden')}>{item.name}</span>
    </NavLink>
  );
}
