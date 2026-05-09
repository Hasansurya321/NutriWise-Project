import { SidebarNavItem } from './SidebarNavItem';

export function SidebarFooter({ items, collapsed = false, onNavigate }) {
  return (
    <div className="mt-6 border-t border-borderSoft pt-4">
      <div className="flex flex-col gap-1">
        {items.map((item) => (
          <SidebarNavItem key={item.to} item={item} collapsed={collapsed} onClick={onNavigate} />
        ))}
      </div>
    </div>
  );
}
