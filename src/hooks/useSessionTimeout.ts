import { useState, useEffect, useCallback } from "react";

/**
 * Configuración del timeout de sesión.
 */
export interface SessionTimeoutConfig {
  /** Milisegundos hasta mostrar el modal de sesión expirada. */
  timeoutMs: number;
  /**
   * Client ID de la aplicación Auth0.
   * Requerido para que el endpoint /v2/logout sepa qué Allowed Logout URLs
   * debe validar. Se obtiene de `consent.client.id` (o el equivalente de
   * cada pantalla) — nunca se hardcodea.
   */
  clientId?: string;
  /**
   * URL a la que Auth0 redirigirá al usuario tras cerrar sesión.
   * Debe estar registrada en:
   *   Dashboard → Applications → [tu app] → Allowed Logout URLs
   *
   * Se configura por ambiente en el archivo .env correspondiente:
   *   .env.development  → VITE_LOGOUT_RETURN_TO=http://localhost:3000
   *   .env.staging      → VITE_LOGOUT_RETURN_TO=https://staging.miapp.com
   *   .env.production   → VITE_LOGOUT_RETURN_TO=https://miapp.com
   *
   * Si no se proporciona, se hace un logout simple sin redirección controlada.
   */
  returnTo?: string;
}

export interface SessionTimeoutResult {
  /** true cuando la sesión ha expirado (timer o error de acción) */
  isSessionExpired: boolean;
  /** Llama a esta función desde el catch de cualquier acción ACUL para mostrar el modal */
  triggerExpiry: () => void;
  /**
   * Cierra la sesión SSO navegando al endpoint /v2/logout del dominio de Auth0.
   * Si se proporcionan clientId y returnTo, agrega los query params necesarios
   * para que Auth0 redirija al usuario a la aplicación tras el logout.
   */
  handleLogout: () => void;
}

/**
 * Hook genérico reutilizable para cualquier pantalla ACUL.
 *
 * Inicia un timer al montar el componente. Si el tiempo llega a su límite
 * antes de que el usuario interactúe, muestra el modal de sesión expirada.
 * También se puede disparar manualmente desde el catch de accept()/deny()
 * u otras acciones del SDK de Auth0 ACUL.
 *
 * ### Logout con redirección correcta
 *
 * Auth0 no expone `redirect_uri` en el contexto de las pantallas ACUL por
 * razones de seguridad. Para que el logout redirija al usuario de vuelta a
 * tu aplicación (en lugar de al login de Auth0), se necesitan dos valores:
 *
 * 1. `clientId` — leído del contexto ACUL: `consent.client.id`
 * 2. `returnTo` — URL de tu app, configurada en la variable de entorno
 *    `VITE_LOGOUT_RETURN_TO` (diferente por ambiente en los archivos .env).
 *
 * @example
 * ```typescript
 * // En el hook de cualquier pantalla:
 * const { isSessionExpired, triggerExpiry, handleLogout } = useSessionTimeout({
 *   timeoutMs: 30 * 60 * 1000,
 *   clientId: consent.client.id,
 *   returnTo: import.meta.env.VITE_LOGOUT_RETURN_TO,
 * });
 *
 * const handleDeny = async () => {
 *   try { await consent.deny(); }
 *   catch { triggerExpiry(); }
 * };
 * ```
 */
export function useSessionTimeout({
  timeoutMs,
  clientId,
  returnTo,
}: SessionTimeoutConfig): SessionTimeoutResult {
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  // Timer que expira automáticamente al cumplirse el tiempo
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setIsSessionExpired(true);
    }, timeoutMs);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [timeoutMs]);

  // Permite disparar la expiración manualmente (ej: desde un catch)
  const triggerExpiry = useCallback(() => {
    setIsSessionExpired(true);
  }, []);

  /**
   * Navega al endpoint de logout del dominio de Auth0.
   *
   * Con clientId + returnTo → Auth0 valida el returnTo contra la allowlist
   * y redirige al usuario a la aplicación correcta.
   *
   * Sin ellos → logout simple (puede redirigir al login de Auth0,
   * que dependiendo de la configuración del tenant puede mostrar Google
   * u otro proveedor directamente).
   */
  const handleLogout = useCallback(() => {
    const base = `${window.location.origin}/v2/logout`;

    if (clientId && returnTo) {
      const params = new URLSearchParams({
        client_id: clientId,
        returnTo,
      });
      window.location.href = `${base}?${params.toString()}`;
    } else {
      window.location.href = base;
    }
  }, [clientId, returnTo]);

  return { isSessionExpired, triggerExpiry, handleLogout };
}
