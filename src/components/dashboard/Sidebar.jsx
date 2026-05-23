import { X, Leaf } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { navigation } from '../../data/navigation';
import { cn } from '../../utils/cn';
import { getIconByName } from '../../utils/iconRegistry';
import { Button } from '../ui/button';

export function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      <div
        className={cn(
          `
            fixed inset-0 z-40
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
            flex h-screen w-[270px]
            flex-col border-r
            border-borderPrimary
            bg-sidebar
            backdrop-blur-md
            ease-out
          `,
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div
          className="
            flex items-center
            justify-between
            border-b border-borderPrimary
            px-6 py-5
          "
        >
          <div className="flex items-center gap-3">
            <div
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-2xl
                border border-borderPrimary
                bg-primary/10 text-primary
                shadow-sm
              "
            >
              <Leaf className="h-5 w-5" />
            </div>

            <div>
              <h2
                className="
                  text-lg font-semibold
                  tracking-tight text-textPrimary
                "
              >
                NutriWise
              </h2>

              <p
                className="
                  text-xs text-textMuted
                "
              >
                Nutrition Analytics
              </p>
            </div>
          </div>

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
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav
          className="
            flex-1 overflow-y-auto
            px-4 py-6
          "
        >
          <div className="flex flex-col gap-2">
            {navigation.map((item) => {
              const Icon = getIconByName(item.iconName, 'LayoutDashboard');

              return (
                <NavLink
                  key={item.label}
                  to={item.href}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      `
                        group relative flex
                        items-center gap-3
                        rounded-2xl border
                        px-4 py-3 text-sm
                        font-medium
                      `,
                      isActive
                        ? `
                            border-primary/10
                            bg-[var(--sidebar-active)]
                            text-textPrimary
                          `
                        : `
                            border-transparent
                            text-textSecondary
                            hover:border-borderPrimary
                            hover:bg-[var(--sidebar-hover)]
                            hover:text-textPrimary
                          `,
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <div
                          className="
                            absolute left-0
                            top-1/2 h-8 w-1
                            -translate-y-1/2
                            rounded-r-full
                            bg-primary
                          "
                        />
                      )}

                      <div
                        className={cn(
                          `
                            flex h-10 w-10
                            shrink-0 items-center
                            justify-center
                            rounded-xl
                          `,
                          isActive
                            ? `
                                bg-primary/10
                                text-primary
                              `
                            : `
                                bg-[var(--sidebar-hover)]
                                text-textSecondary
                                group-hover:text-textPrimary
                              `,
                        )}
                      >
                        {Icon ? <Icon className="h-5 w-5" /> : null}
                      </div>

                      <span>{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div
          className="
            border-t border-borderPrimary
            px-6 py-5
          "
        >
          <div
            className="
              rounded-2xl border
              border-borderPrimary
              bg-[var(--sidebar-footer)]
              p-4
            "
          >
            <p
              className="
                text-xs font-medium
                text-textMuted
              "
            >
              NutriWise AI
            </p>

            <p
              className="
                mt-1 text-sm
                leading-relaxed
                text-textSecondary
              "
            >
              Smart nutrition tracking with AI-powered analytics.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
