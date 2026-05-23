import { RouterProvider } from 'react-router-dom';

import { router } from './routes';
import { MockModeProvider } from './context/MockModeContext';

export default function App() {
  return (
    <MockModeProvider>
      <RouterProvider router={router} />
    </MockModeProvider>
  );
}
