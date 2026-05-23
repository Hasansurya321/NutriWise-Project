/**
 * Mock Auth Service
 *
 * Wrapper around the core auth functions from src/services/auth.js
 * Provides a clean API facade for authentication operations.
 */

import * as coreAuth from '../auth.js';
import { initializeMockDataForUser } from './mockDataInitializer.js';

export default {
  /**
   * Login with demo credentials
   * Internally triggers mock data initialization
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {boolean} Success status
   */
  loginDummy(email, password) {
    const success = coreAuth.loginDummy(email, password);

    if (success) {
      const session = coreAuth.getSession();
      if (session?.email) {
        initializeMockDataForUser(session.email);
      }
    }

    return success;
  },

  /**
   * Logout - clears auth session only
   * NOTE: Does NOT clear mock data (nw_mock_* localStorage entries persist)
   * This enables re-login with previous data intact
   */
  logoutDummy() {
    coreAuth.logoutDummy();
  },

  /**
   * Get current session
   * @returns {object|null} Session object with { authenticated, email, loggedInAt } or null
   */
  getSession() {
    return coreAuth.getSession();
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    return coreAuth.isAuthenticated();
  },
};
