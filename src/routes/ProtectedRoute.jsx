import { Navigate } from 'react-router-dom';

import { authService } from '../services';

export default function ProtectedRoute({ children, unauthenticated = 'redirect' }) {
  if (!authService.isAuthenticated()) {
    if (unauthenticated === 'render') {
      return children;
    }

    return <Navigate to="/auth" replace />;
  }

  return children;
}
