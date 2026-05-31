import { Leaf } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Logo({ 
  collapsed, 
  className, 
  iconClassName, 
  textClassName,
  subtitleClassName,
  showSubtitle = true,
  size = 'md' 
}) {
  const sizeStyles = {
    sm: {
      iconContainer: "h-8 w-8 rounded-xl",
      icon: "h-4 w-4",
      title: "text-sm font-semibold",
      subtitle: "text-[10px]"
    },
    md: {
      iconContainer: "h-11 w-11 rounded-2xl",
      icon: "h-5 w-5",
      title: "text-lg font-bold tracking-tight",
      subtitle: "text-xs"
    },
    lg: {
      iconContainer: "h-14 w-14 rounded-3xl border-2",
      icon: "h-7 w-7",
      title: "text-2xl font-black tracking-tighter",
      subtitle: "text-sm"
    }
  };

  const styles = sizeStyles[size] || sizeStyles.md;

  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      <div className={cn(`flex shrink-0 items-center justify-center border border-primary/20 bg-primary/10 text-primary shadow-glow`, styles.iconContainer, iconClassName)}>
        <Leaf className={styles.icon} />
      </div>

      <div className={cn('min-w-0 flex flex-col justify-center', collapsed && 'hidden')}>
        <h1 className={cn(`truncate text-textPrimary`, styles.title, textClassName)}>
          NutriCitra
        </h1>
        {showSubtitle && (
          <p className={cn(`truncate text-textSecondary font-medium`, styles.subtitle, subtitleClassName)}>
            Nutrition AI
          </p>
        )}
      </div>
    </div>
  );
}
