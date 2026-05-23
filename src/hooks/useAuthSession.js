import { useEffect, useState } from 'react';

import { AUTH_SESSION_EVENT, authService } from '../services';

export function useAuthSession() {
  const [session, setSession] = useState(() => authService.getSession());

  useEffect(() => {
    const syncSession = () => {
      setSession(authService.getSession());
    };

    window.addEventListener(AUTH_SESSION_EVENT, syncSession);
    window.addEventListener('storage', syncSession);

    return () => {
      window.removeEventListener(AUTH_SESSION_EVENT, syncSession);
      window.removeEventListener('storage', syncSession);
    };
  }, []);

  return session;
}
