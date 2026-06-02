import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, unauthenticated = 'redirect' }) {
  const { isAuthenticated, isLoading, hasProfile } = useAuth();
  const location = useLocation();

  // 1. Tahan rute selama data session/profile sedang di-fetch dari Supabase
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-textSecondary bg-background">
        Memeriksa sesi...
      </div>
    );
  }

  // 2. Cek status autentikasi token login
  if (!isAuthenticated) {
    if (unauthenticated === 'render') {
      return children;
    }
    return <Navigate to="/auth" replace />;
  }

  // 3. KONDISI A: User SUDAH punya profil, tapi coba-coba buka /onboarding
  if (location.pathname === '/onboarding' && hasProfile) {
    return <Navigate to="/dashboard" replace />;
  }

  // 4. KONDISI B: User BELUM punya profil, dan sedang mencoba akses halaman dashboard/gizi
  if (location.pathname !== '/onboarding' && !hasProfile) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}