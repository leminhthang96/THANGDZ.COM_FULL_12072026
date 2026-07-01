export const AUTH_TOKEN_KEY = 'admin_token';
export const AUTH_ROLE_KEY = 'admin_role';
export const AUTH_EMAIL_KEY = 'admin_email';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getRole(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(AUTH_ROLE_KEY);
}

export function setAuth(token: string, role: string, email: string) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_ROLE_KEY, role);
  localStorage.setItem(AUTH_EMAIL_KEY, email);
}

export function clearAuth() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_ROLE_KEY);
  localStorage.removeItem(AUTH_EMAIL_KEY);
}

export function isAdmin(): boolean {
  return getRole() === 'admin';
}
