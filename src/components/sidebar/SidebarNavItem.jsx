import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { getIconByName } from '../../utils/iconRegistry';

export function SidebarNavItem({ item, onClick, collapsed }) {
  const Icon = item.icon || getIconByName(item.iconName, 'LayoutDashboard');

  return (
    <NavLink
      to={item.href || item.to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          `group relative flex items-center rounded-2xl border py-3 text-sm font-medium`,
          collapsed ? `gap-3 px-4 lg:justify-center lg:px-0` : `gap-3 px-4`,
          isActive
            ? `border-primary/10 bg-[var(--sidebar-active)] text-textPrimary`
            : `border-transparent text-textSecondary hover:border-borderPrimary hover:bg-[var(--sidebar-hover)] hover:text-textPrimary`,
        )
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
          )}
          <div
            className={cn(
              `flex h-10 w-10 shrink-0 items-center justify-center rounded-xl`,
              isActive
                ? `bg-primary/10 text-primary`
                : `bg-[var(--sidebar-hover)] text-textSecondary group-hover:text-textPrimary`,
            )}
          >
            {Icon ? <Icon className="h-5 w-5" /> : null}
          </div>
          <span className={cn("truncate", collapsed && "lg:hidden")}>{item.label || item.name}</span>
        </>
      )}
    </NavLink>
  );
}
