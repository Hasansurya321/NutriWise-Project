import { X } from 'lucide-react';

import { navigation } from '../../data/navigation';
import { cn } from '../../utils/cn';
import { Button } from '../ui/button';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNavItem } from './SidebarNavItem';
import { SidebarFooter } from './SidebarFooter';

export function Sidebar({ mobileOpen, onClose, collapsed, onToggleCollapsed }) {
  return (
    <>
      <div
        className={cn(
          `
            fixed inset-0 z-50
            bg-black/40 backdrop-blur-sm
            lg:hidden
          `,
          mobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          `
            fixed left-0 top-0 z-50
            flex h-screen

            flex-col border-r
            border-borderPrimary
            bg-sidebar
            backdrop-blur-md
            ease-out
            transition-all duration-300
          `,
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          collapsed ? 'w-72 lg:w-[88px]' : 'w-72'
        )}
      >
        <div
          className="
            flex items-center
            justify-between
            border-b border-borderPrimary
            px-6 h-20
          "
        >
          <SidebarHeader collapsed={collapsed} onToggleCollapsed={onToggleCollapsed} />

          <Button
            variant="ghost"
            size="icon"
            className="
              text-textSecondary
              hover:bg-[var(--sidebar-hover)]
              hover:text-textPrimary
              lg:hidden
            "
            onClick={onClose}
          >
            <X className="h-5 w-5 aspect-square" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="flex flex-col gap-2">
            {navigation.map((item) => (
              <SidebarNavItem key={item.label || item.href} item={item} onClick={onClose} collapsed={collapsed} />
            ))}
          </div>
        </nav>

        <div className={cn(collapsed && "lg:hidden")}>
          <SidebarFooter />
        </div>
      </aside>
    </>
  );
}
