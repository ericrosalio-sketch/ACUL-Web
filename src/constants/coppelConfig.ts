/**
 * coppelConfig.ts
 *
 * Constantes de configuración de Coppel.
 *
 * Las URLs de navegación se obtienen desde client.metadata de Auth0,
 * expuesto en window.universal_login_context.client.metadata.
 * Esto permite que cada tenant (Dev, QA, Staging, Prod) tenga sus propias
 * URLs configuradas directamente en el dashboard de Auth0, sin necesidad
 * de builds distintos por ambiente.
 *
 * Equivalente a las variables Liquid del template clásico:
 *   {{ application.metadata['privacidad-url'] }}
 *   {{ application.metadata['TyC-url'] }}
 *   {{ application.metadata.logout_url }}
 *
 * Las keys deben coincidir exactamente con las configuradas en el cliente
 * Auth0 de cada tenant y declaradas en context_configuration del settings.json.
 */

/** URLs de recursos estáticos del CDN de Coppel (mismo que branding_templates) */
export const COPPEL_CDN = {
  logoUrl:        "https://cdn5.coppel.com/Auth0/SVG/logo.svg",
  casitaIconUrl:  "https://cdn5.coppel.com/Auth0/SVG/casita.svg",
} as const;

/** URLs de iconos de providers sociales */
export const COPPEL_CDN_SOCIAL_ICONS: Record<string, string> = {
  apple:          "https://cdn5.coppel.com/Auth0/SVG/apple-icon.svg",
  google:         "https://cdn5.coppel.com/Auth0/SVG/google-icon.svg",
  windowslive:    "https://cdn5.coppel.com/Auth0/SVG/microsoft-icon.svg",
  fingerprint:    "https://cdn5.coppel.com/Auth0/SVG/fingerprint.svg",
} as const;

/**
 * URLs de navegación.
 *
 * Fuente de datos (en orden de precedencia):
 *  1. client.metadata de Auth0 — configurado directamente en cada tenant por ambiente
 *     desde el dashboard de Auth0. Es la única fuente necesaria en todos los ambientes.
 *     Keys: home_url | logout_url | privacidad-url | TyC-url
 *  2. URLs de producción de Coppel como último fallback de seguridad.
 *     Solo aplica si Auth0 no expone algún metadata key (configuración incompleta del tenant).
 *
 * NOTA: No se usan variables de entorno Vite para las URLs de navegación.
 * La ambientación por entorno se gestiona directamente desde el tenant de Auth0,
 * configurando los client.metadata correspondientes en cada ambiente.
 */

export const COPPEL_URLS = {
  homeUrl:         "https://www.coppel.com",
  logoutUrl:       "https://www.coppel.com",
  privacidadUrl:   "https://www.coppel.com/aviso-de-privacidad",
  tycUrl:          "https://www.coppel.com/terminos-y-condiciones",
} as const;

/** Textos estáticos del footer (del template branding) */
export const COPPEL_TEXTS = {
  copyright: `${new Date().getFullYear()} © Coppel todos los derechos reservados`,
  privacidadLabel: "Aviso de privacidad",
  tycLabel: "Términos y condiciones",
  volverInicio: "Volver a inicio",
  logoAlt: "Coppel Logo",
  casitaAlt: "Home Icon",
} as const;
