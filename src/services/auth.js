export const AUTH_STORAGE_KEY = 'nutriwise-auth';

const DUMMY_EMAIL = 'hasansuryadharma@example.com';

const DUMMY_PASSWORD = 'Password123!';

export function loginDummy(email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  const normalizedPassword = password.trim();

  const isValid = normalizedEmail === DUMMY_EMAIL && normalizedPassword === DUMMY_PASSWORD;

  if (!isValid) {
    return false;
  }

  const session = {
    authenticated: true,
    email: DUMMY_EMAIL,
    loggedInAt: new Date().toISOString(),
  };

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));

  return true;
}

export function logoutDummy() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getSession() {
  const rawValue = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  const session = getSession();

  return Boolean(session?.authenticated);
}
