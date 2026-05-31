import {
  Activity,
  AlertTriangle,
  Apple,
  Banana,
  Beef,
  BrainCircuit,
  CheckCircle2,
  CircleAlert,
  Droplets,
  Drumstick,
  EggFried,
  Flame,
  History,
  LayoutDashboard,
  LineChart,
  Salad,
  Sandwich,
  Soup,
  Sparkles,
  Wheat,
  Scan
} from 'lucide-react';

export const iconMap = {
  Activity,
  AlertTriangle,
  Apple,
  Banana,
  Beef,
  BrainCircuit,
  CheckCircle2,
  CircleAlert,
  Droplets,
  Drumstick,
  EggFried,
  Flame,
  History,
  LayoutDashboard,
  LineChart,
  Salad,
  Sandwich,
  Soup,
  Sparkles,
  Wheat,
  Scan,
  
};

export function getIconByName(iconName, fallbackName = null) {
  if (typeof iconName === 'string' && iconMap[iconName]) {
    return iconMap[iconName];
  }

  if (typeof fallbackName === 'string' && iconMap[fallbackName]) {
    return iconMap[fallbackName];
  }

  return null;
}

