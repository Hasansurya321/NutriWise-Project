import { cn } from '../../utils/cn';

export function DashboardHeader({ username = 'Hasan', title, description, className }) {
  const resolvedTitle = title || `Welcome back, ${username}!`;

  return (
    <section className={cn('mb-6 flex flex-col gap-1 sm:mb-8 sm:gap-2', className)}>
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-textPrimary sm:text-4xl xl:text-5xl">{resolvedTitle}</h1>

      {description ? <p className="max-w-2xl text-sm leading-6 text-textSecondary sm:text-base">{description}</p> : null}
    </section>
  );
}
