/**
 * Mock Configuration
 *
 * Controls whether to use mock services or real backend API
 * Centralized feature flag for the entire application
 */

export const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const MOCK_CONFIG = {
  enabled: USE_MOCK_DATA,
  seedEmail: 'hasansuryadharma@example.com',
  version: '1.0.0',
};

if (USE_MOCK_DATA) {
  console.log('🔧 Running in MOCK mode. Set VITE_USE_MOCK_DATA=false to switch to real API.');
} else {
  console.log('🚀 Running in PRODUCTION mode with real backend API.');
}
