import { Logo } from '../ui/Logo';

export function SidebarHeader({ collapsed }) {
  return (
    <div className="flex w-full items-center justify-between lg:justify-start gap-3">
      <Logo collapsed={collapsed} />
    </div>
  );
}
