import { Navigate, createBrowserRouter } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';

import AuthPage from '../pages/auth/AuthPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import HistoryPage from '../pages/history/HistoryPage';
import ProfilePage from '../pages/profile/ProfilePage';
import InsightsPage from '../pages/insights/InsightsPage';
import PredictPage from '../pages/predict/PredictPage';

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute unauthenticated="render">
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'history',
        element: (
          <ProtectedRoute>
            <HistoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'predict',
        element: (
          <ProtectedRoute>
            <PredictPage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'insights',
        element: (
          <ProtectedRoute>
            <InsightsPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
