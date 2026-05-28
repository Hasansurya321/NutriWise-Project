import { RouterProvider } from 'react-router-dom';

import { router } from './routes';
import { AuthProvider } from './context/AuthContext';
import { MockModeProvider } from './context/MockModeContext';

export default function App() {
  return (
    <AuthProvider>
      <MockModeProvider>
        <RouterProvider router={router} />
      </MockModeProvider>
    </AuthProvider>
  );
}
