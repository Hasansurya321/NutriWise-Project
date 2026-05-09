import { motion } from 'framer-motion';

import { cn } from '../../utils/cn';
import { Card } from '../ui/card';

const accentStyles = {
  green: {
    icon: 'bg-primary/10 text-primary',
    fill: 'bg-primary',
  },
  blue: {
    icon: 'bg-info/10 text-info',
    fill: 'bg-info',
  },
  orange: {
    icon: 'bg-warning/10 text-warning',
    fill: 'bg-warning',
  },
  warning: {
    icon: 'bg-warning/10 text-warning',
    fill: 'bg-warning',
  },
};

export function StatsCard({ title, value, target, progress = 0, meta, icon: Icon, color = 'green', className }) {
  const safeProgress = Math.max(0, Math.min(100, Number(progress) || 0));

  const theme = accentStyles[color] || accentStyles.green;

  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.2,
        ease: 'easeOut',
      }}
      className="h-full"
    >
      <Card
        className={cn(
          `
            h-full rounded-3xl transition-all duration-200
            hover:border-primary/10
          `,
          className,
        )}
      >
        <article className="flex h-full flex-col gap-4 p-5 sm:p-6">
          <header className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-textSecondary">{title}</p>
            </div>

            <div
              className={cn(
                `
                  flex h-10 w-10 shrink-0 items-center
                  justify-center rounded-full
                `,
                theme.icon,
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
          </header>

          <div className="space-y-1">
            <div className="flex flex-wrap items-end gap-2">
              <span
                className="
                  text-3xl font-bold tracking-tight
                  text-textPrimary sm:text-4xl
                "
              >
                {value}
              </span>

              {target ? <span className="pb-1 text-base text-textSecondary">/ {target}</span> : null}
            </div>

            {meta ? <p className="text-xs text-textSecondary">{meta}</p> : null}
          </div>

          <div className="space-y-2">
            <div
              className="
                h-2 overflow-hidden rounded-full bg-white/10
              "
            >
              <div
                className={cn(
                  `
                    h-full rounded-full transition-all
                    duration-500
                  `,
                  theme.fill,
                )}
                style={{
                  width: `${safeProgress}%`,
                }}
              />
            </div>

            <div
              className="
                flex items-center justify-between text-xs
                text-textSecondary
              "
            >
              <span>Progress</span>
              <span>{safeProgress}%</span>
            </div>
          </div>
        </article>
      </Card>
    </motion.div>
  );
}
