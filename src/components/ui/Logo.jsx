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
      iconContainer: "h-12 w-12 rounded-full",
      icon: "h-7 w-7",
      title: "text-2xl font-black tracking-tighter",
      subtitle: "text-sm"
    }
  };

  const styles = sizeStyles[size] || sizeStyles.md;

  return (
    <div className={cn("flex min-w-0 items-center gap-3", className)}>
      <div className={cn(`flex shrink-0 items-center justify-center text-primary `, styles.iconContainer, iconClassName)}>
        <img src="/NutriCitraLogo.png" alt="logo"  className='w-full h-full object-contain'/>
      </div>

      <div className={cn('min-w-0 flex flex-col justify-center', collapsed && 'hidden')}>
        <h1 className={cn(`truncate text-textPrimary`, styles.title, textClassName)}>
          <span className="text-primary">Nutri</span>Citra
        </h1>
      </div>
    </div>
  );
}
