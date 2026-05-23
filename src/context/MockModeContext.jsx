/**
 * Mock Mode Context
 *
 * Provides access to the mock mode feature flag throughout the application.
 * This enables future runtime switching between mock and real backend modes.
 */

import { createContext, useContext } from 'react';
import { USE_MOCK_DATA, MOCK_CONFIG } from '../config/mockConfig.js';

const MockModeContext = createContext({
  isEnabled: USE_MOCK_DATA,
  config: MOCK_CONFIG,
});

export function MockModeProvider({ children }) {
  const value = {
    isEnabled: USE_MOCK_DATA,
    config: MOCK_CONFIG,
  };

  return <MockModeContext.Provider value={value}>{children}</MockModeContext.Provider>;
}

/**
 * Hook to access mock mode state
 * @returns {object} { isEnabled, config }
 */
export function useMockMode() {
  const context = useContext(MockModeContext);

  if (!context) {
    throw new Error('useMockMode must be used within MockModeProvider');
  }

  return context;
}
