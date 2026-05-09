import { History, LayoutDashboard, LineChart } from 'lucide-react';

export const navigation = [
  {
    label: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },

  {
    label: 'History',
    href: '/history',
    icon: History,
  },

  {
    label: 'Analytic',
    href: '/insights',
    icon: LineChart,
  },
];
