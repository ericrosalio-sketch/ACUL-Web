import type { UniversalLoginContext } from "./auth0-sdk";

declare global {
  interface Window {
    universal_login_context: UniversalLoginContext;
    /**
     * Google Tag Manager dataLayer array.
     * Se usa para enviar eventos de analítica a GTM.
     * Tipado como array de objetos arbitrarios para máxima flexibilidad.
     */
    dataLayer: Record<string, unknown>[];
  }
}

export {};
