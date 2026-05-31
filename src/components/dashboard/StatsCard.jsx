import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';
import { getIconByName } from '../../utils/iconRegistry';
import { Card } from '../ui/card';

// Menggunakan paduan warna Tailwind standar yang aman & kontras tinggi
const accentStyles = {
  green: {
    icon: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400',
    fill: 'bg-emerald-500',
  },
  blue: {
    icon: 'bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400',
    fill: 'bg-blue-500',
  },
  orange: {
    icon: 'bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-400',
    fill: 'bg-orange-500',
  },
  warning: {
    icon: 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400',
    fill: 'bg-amber-500',
  },
};

export function StatsCard({
  title,
  value,
  target,
  progress = 0,
  meta,
  iconName,
  color = 'green',
  className,
}) {
  // Memastikan nilai progress berada di rentang 0 - 100
  const safeProgress = Math.max(0, Math.min(100, Number(progress) || 0));

  const theme = accentStyles[color] || accentStyles.green;

  const ResolvedIcon = getIconByName(iconName, 'Orange');

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
        <article className="flex h-full flex-col gap-5 p-5 sm:p-6">

          {/* Bagian Atas: Judul dan Icon */}
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
              {ResolvedIcon ? <ResolvedIcon className="h-5 w-5" /> : null}
            </div>
          </header>

          {/* Bagian Tengah: Angka Konsumsi vs Target Nutrisi */}
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

              {target ? (
                <span className="pb-1 text-base text-textSecondary font-medium">
                  / {target}
                </span>
              ) : null}
            </div>

            {meta ? <p className="text-xs text-textSecondary">{meta}</p> : null}
          </div>

          {/* Bagian Bawah: Progress Bar (FIXED: Lebih kontras & konsisten) */}
          <div className="mt-auto space-y-2">
            <div
              className="
                h-2 w-full overflow-hidden rounded-full 
                bg-neutral-100 dark:bg-neutral-800
              "
            >
              <div
                className={cn(
                  `
                    h-full rounded-full transition-all
                    duration-500 ease-out
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
                font-medium text-textSecondary
              "
            >
              <span>Progress</span>
              <span className="font-bold text-textPrimary">{safeProgress}%</span>
            </div>
          </div>

        </article>
      </Card>
    </motion.div>
  );
}