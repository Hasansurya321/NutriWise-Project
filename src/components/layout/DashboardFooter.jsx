import { Logo } from '../ui/Logo';

export function DashboardFooter() {

  return (
    <footer className="border-t border-borderPrimary bg-card/60 px-6 pt-8 pb-32 lg:pb-8">
      <div className="mx-auto flex w-full flex-col items-center justify-between gap-8 text-xs text-textMuted sm:flex-row">
        <div className="flex items-center gap-1.5">
          <Logo size='sm' />
        </div>



        <div className="flex items-center gap-3">
          <span className="rounded-full border border-borderPrimary bg-background px-2 py-0.5 font-mono text-[0.6rem] text-textMuted">
            v1.0.0
          </span>
          <span>Dicoding Capstone 2026</span>
        </div>
      </div>
    </footer>
  );
}
