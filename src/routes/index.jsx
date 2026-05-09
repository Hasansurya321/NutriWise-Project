import { createBrowserRouter, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardPage from '../pages/dashboard/DashboardPage';
import MealsPage from '../pages/meals/MealsPage';
import InsightsPage from '../pages/insights/InsightsPage';
import SettingsPage from '../pages/settings/SettingsPage';
import HistoryPage from '../pages/history/HistoryPage';
import ProfilePage from '../pages/profile/ProfilePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'meals', element: <MealsPage /> },
      { path: 'history', element: <HistoryPage /> },
      { path: 'insights', element: <InsightsPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
