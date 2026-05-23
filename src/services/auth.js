export const AUTH_STORAGE_KEY = 'nutriwise-auth';
export const AUTH_SESSION_EVENT = 'nutriwise-auth-change';

const DUMMY_EMAIL = 'hasansuryadharma@example.com';

const DUMMY_PASSWORD = 'Password123!';

function notifyAuthSessionChange() {
  window.dispatchEvent(new Event(AUTH_SESSION_EVENT));
}

function clearLegacyAuthStorage() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

function isValidSession(session) {
  return Boolean(session?.authenticated === true && typeof session.email === 'string' && session.email.trim());
}

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

  clearLegacyAuthStorage();
  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  notifyAuthSessionChange();

  return true;
}

export function logoutDummy() {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
  clearLegacyAuthStorage();
  notifyAuthSessionChange();
}

export function getSession() {
  clearLegacyAuthStorage();

  const rawValue = sessionStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawValue) {
    return null;
  }

  try {
    const session = JSON.parse(rawValue);

    if (!isValidSession(session)) {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    return session;
  } catch {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function isAuthenticated() {
  const session = getSession();

  return Boolean(session?.authenticated);
}
