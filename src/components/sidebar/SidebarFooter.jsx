export function SidebarFooter() {
  return (
    <div className="border-t border-borderPrimary px-6 py-5">
      <div className="rounded-2xl border border-borderPrimary bg-[var(--sidebar-footer)] p-4">
        <p className="text-xs font-medium text-textMuted">NutriCitra AI</p>
        <p className="mt-1 text-sm leading-relaxed text-textSecondary">
          Smart nutrition detection with AI.
        </p>
      </div>
    </div>
  );
}
