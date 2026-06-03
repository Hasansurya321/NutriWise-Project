import { useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';

import AuthSplitLayout from '../../components/auth/AuthSplitLayout';
import { useAuth } from '../../context/AuthContext';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

export default function AuthPage() {
  useDocumentTitle('Autentikasi');
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState(initialMode);

  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex h-screen w-full items-center justify-center text-textSecondary">Memeriksa sesi...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div
      className="
        fixed inset-0
        h-screen w-screen
        overflow-y-auto
      "
    >
      <div
        className="
          fixed inset-0
          pointer-events-none
          bg-surface
        "
        aria-hidden="true"
      />

      <div
        className="
          relative z-10
          flex min-h-full w-full
          items-center justify-center
          px-6 py-10
        "
      >
        <AuthSplitLayout mode={mode} setMode={setMode} />
      </div>
    </div>
  );
}
