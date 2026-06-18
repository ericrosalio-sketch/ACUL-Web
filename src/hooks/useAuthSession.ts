/**
 * Hook para manejar sesión de autenticación en desarrollo/demos
 * Usa sessionStorage para simular un usuario autenticado
 */

export interface AuthUser {
  username: string;
  email?: string;
  name?: string;
}

const SESSION_KEY = "demo_auth_user";

export const useAuthSession = () => {
  const getAuthUser = (): AuthUser | null => {
    if (typeof window === "undefined") return null;
    const stored = sessionStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  };

  const setAuthUser = (user: AuthUser) => {
    if (typeof window === "undefined") return;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  };

  const clearAuthUser = () => {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem(SESSION_KEY);
  };

  const isAuthenticated = (): boolean => {
    return getAuthUser() !== null;
  };

  return {
    user: getAuthUser(),
    isAuthenticated: isAuthenticated(),
    setAuthUser,
    clearAuthUser,
  };
};
