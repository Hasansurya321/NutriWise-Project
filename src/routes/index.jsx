import { Navigate, createBrowserRouter } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';
import ProtectedRoute from './ProtectedRoute';

import AuthPage from '../pages/auth/AuthPage';
import DashboardPage from '../pages/dashboard/DashboardPage';
import HistoryPage from '../pages/history/HistoryPage';
import ProfilePage from '../pages/profile/ProfilePage';
import InsightsPage from '../pages/insights/InsightsPage';
import PredictPage from '../pages/predict/PredictPage';
import OnboardingPage from '../pages/onboarding/OnboardingPage';
import NotFoundPage from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthPage />,
  },
  
  {
    path: '/onboarding',
    element: (
      <ProtectedRoute>
        <OnboardingPage />
      </ProtectedRoute>
    ),
  },

  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />, 
      },
      {
        path: 'history',
        element: <HistoryPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
      {
        path: 'predict',
        element: <PredictPage />,
      },
      {
        path: 'insights',
        element: <InsightsPage />,
      },
    ],
  },
  
  {
    path: '*',
    element: <NotFoundPage/>,
  },
]);