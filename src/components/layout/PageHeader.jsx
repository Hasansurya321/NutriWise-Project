import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }
};

export function PageHeader({ title, description, children, className }) {
  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className={cn('flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between', className)}
    >
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-textPrimary">{title}</h1>
        {description && (
          <p className="mt-1.5 text-sm text-textSecondary max-w-2xl">{description}</p>
        )}
      </div>

      {children && (
        <div className="shrink-0 flex items-center gap-3">
          {children}
        </div>
      )}
    </motion.header>
  );
}
