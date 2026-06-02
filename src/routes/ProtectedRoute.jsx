import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, unauthenticated = 'redirect' }) {
  const { isAuthenticated, isLoading, hasProfile } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center text-textSecondary">Memeriksa sesi...</div>;
  }

  if (!isAuthenticated) {
    if (unauthenticated === 'render') {
      return children;
    }
    return <Navigate to="/auth" replace />;
  }

  // Jika sudah login tapi belum punya profile, redirect ke onboarding
  // Kecuali sedang di halaman onboarding itu sendiri
  if (location.pathname !== '/onboarding' && !hasProfile) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}
