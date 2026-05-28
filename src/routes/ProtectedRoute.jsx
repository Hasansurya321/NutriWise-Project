import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, unauthenticated = 'redirect' }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center text-textSecondary">Memeriksa sesi...</div>;
  }

  if (!isAuthenticated) {
    if (unauthenticated === 'render') {
      return children;
    }

    return <Navigate to="/auth" replace />;
  }

  return children;
}
