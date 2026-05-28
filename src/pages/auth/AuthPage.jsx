import { useState } from 'react';

import { Navigate, useSearchParams } from 'react-router-dom';

import AuthSplitLayout from '../../components/auth/AuthSplitLayout';
import { authService } from '../../services';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState(initialMode);

  if (authService.isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div
      className="
        fixed inset-0
        h-screen w-screen
        overflow-hidden
      "
    >
      <div
        className="
          absolute inset-0
          flex
        "
        aria-hidden="true"
      >
        <div className="h-full w-1/2 bg-primary" />
        <div className="h-full w-1/2 bg-background" />

        <div
          className="
            absolute left-1/2 top-0
            h-full w-px
            -translate-x-1/2
            bg-black/10
          "
        />
      </div>

      <div
        className="
          relative z-10
          flex h-full w-full
          items-center justify-center
          px-6
        "
      >
        <AuthSplitLayout mode={mode} setMode={setMode} />
      </div>
    </div>
  );
}
