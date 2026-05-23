/**
 * Scoped Storage Utilities
 *
 * Provides user-scoped localStorage access with namespaced keys to prevent collisions.
 * All mock data keys follow the pattern: nw_mock_{category}_{email}
 *
 * Examples:
 * - nw_mock_profile_hasansuryadharma@example.com
 * - nw_mock_mealHistory_hasansuryadharma@example.com
 * - nw_mock_nutrition_hasansuryadharma@example.com
 */

/**
 * Generate a namespaced storage key for a specific user
 * @param {string} email - User email address
 * @param {string} category - Data category (e.g., 'profile', 'mealHistory', 'nutrition')
 * @returns {string} Formatted key: nw_mock_{category}_{email}
 */
export function getScopedStorageKey(email, category) {
  if (!email || !category) {
    throw new Error('Email and category are required for scoped storage key');
  }
  return `nw_mock_${category}_${email}`;
}

/**
 * Retrieve a JSON value from user-scoped storage
 * @param {string} email - User email address
 * @param {string} category - Data category
 * @returns {any} Parsed JSON value or null if not found
 */
export function getScopedStorage(email, category) {
  const key = getScopedStorageKey(email, category);
  const rawValue = localStorage.getItem(key);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    console.error(`Failed to parse scoped storage key "${key}":`, error);
    return null;
  }
}

/**
 * Store a JSON value to user-scoped storage
 * @param {string} email - User email address
 * @param {string} category - Data category
 * @param {any} value - Value to store (will be JSON stringified)
 */
export function setScopedStorage(email, category, value) {
  const key = getScopedStorageKey(email, category);

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to store scoped storage key "${key}":`, error);
    throw error;
  }
}

/**
 * Remove a specific user-scoped storage entry
 * @param {string} email - User email address
 * @param {string} category - Data category
 */
export function removeScopedStorage(email, category) {
  const key = getScopedStorageKey(email, category);
  localStorage.removeItem(key);
}

/**
 * DEVELOPER UTILITY: Clear all mock data for a user
 *
 * WARNING: This is a manual cleanup function for development/debugging only.
 * It is NEVER automatically triggered during logout.
 * Logout preserves all nw_mock_* data to enable session continuity.
 *
 * Use cases:
 * - Manual reset during development
 * - Debug script cleanup
 * - Testing data isolation
 *
 * @param {string} email - User email address
 * @returns {number} Number of keys removed
 */
export function clearUserMockData(email) {
  if (!email) {
    throw new Error('Email is required to clear mock data');
  }

  const prefix = `nw_mock_`;
  const userSuffix = `_${email}`;
  let keysRemoved = 0;

  // Iterate through all localStorage keys and remove those matching the pattern
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix) && key.endsWith(userSuffix)) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach((key) => {
    localStorage.removeItem(key);
    keysRemoved++;
  });

  console.log(`Cleared ${keysRemoved} mock data entries for ${email}`);
  return keysRemoved;
}

/**
 * DEVELOPER UTILITY: Get debug information about scoped storage for a user
 * @param {string} email - User email address
 * @returns {object} Debug info with all scoped keys and values
 */
export function debugScopedStorage(email) {
  const prefix = `nw_mock_`;
  const userSuffix = `_${email}`;
  const data = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix) && key.endsWith(userSuffix)) {
      const value = localStorage.getItem(key);
      try {
        data[key] = JSON.parse(value);
      } catch {
        data[key] = value;
      }
    }
  }

  return data;
}
