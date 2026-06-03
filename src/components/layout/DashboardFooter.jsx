import { Heart } from 'lucide-react';

export function DashboardFooter({ collapsed }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-borderPrimary bg-card/60 px-6 pt-8 pb-32 lg:pb-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col items-center justify-between gap-2 text-xs text-textMuted sm:flex-row">
        {/* Left – brand */}
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-textSecondary">NutriCitra</span>
          <span>·</span>
          <span>© {year} All rights reserved.</span>
        </div>

        {/* Center – tagline */}
        <p className="hidden sm:flex items-center gap-1">
          Made with  <Heart size={11} className="text-rose-500 fill-rose-500 mx-0.5" /> by NutriCitra Team
        </p>

        {/* Right – version / legal */}
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
