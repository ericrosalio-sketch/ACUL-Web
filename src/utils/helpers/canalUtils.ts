/**
 * canalUtils.ts
 *
 * Utilidad para resolver el valor del canal de analítica (dataLayer)
 * a partir del clientId de Auth0 expuesto en window.universal_login_context.
 *
 * El mapa CLIENT_ID_CANAL_MAP debe popularse con los clientIds reales
 * de cada tenant cuando estén disponibles.
 *
 * Uso:
 *   import { getCanalByClientId } from '@/utils/helpers/canalUtils';
 *   const canal = getCanalByClientId(); // 'Coppel.com' | 'App Coppel' | 'Coppel.com en tienda'
 */

export type Canal = 'Coppel.com' | 'App Coppel - Android' | 'App Coppel - iOS' | 'Coppel.com en tienda';

/**
 * Mapa de clientId de Auth0 → canal de analítica.
 *
 * Agregar aquí los clientIds reales cuando estén disponibles:
 *   'CLIENT_ID_APP_COPPEL':     'App Coppel',
 *   'CLIENT_ID_COPPEL_TIENDA':  'Coppel.com en tienda',
 */
const CLIENT_ID_CANAL_MAP: Record<string, Canal> = {
    // DEV
    'xgGLdRWkSewJyhSUxhFCAhznY66luTU8': 'App Coppel - Android', // Android
    'keWX8LIckaFAfZijOyb0loGWWUvJZmmJ': 'App Coppel - iOS', // iOS
    'ER4kqxVJv5KMfJSMB8YEWvJ306HlKhn5': 'Coppel.com en tienda',
    'QYAgMKnChE6ljDAnAnrvkb99vSak4CI7': 'Coppel.com',

    // QA
    't1d57wX1oBx108H4zwvXe48ECLZ6dhln': 'App Coppel - Android', // Android
    'BLBP9YAEGSgfBgQkiBEtHjOGqtDMyTwu': 'App Coppel - iOS', // iOS
    'MjgidPypr1Hq058uj1unf6lCH7xrh2I7': 'Coppel.com en tienda',
    'ihoBaCNCe0OvKfJPzm2qv33bouJ2VZI4': 'Coppel.com',

    // STA
    '2776QwsD9hU2O3GO53vXZZzCj0wLZDmu': 'App Coppel - Android', // Android
    'RHI8WuQX3pbpB3ZWwhrzLJpggWpN8UFK': 'App Coppel - iOS', // iOS
    'uBtdnolFSamjofLcRKvYyR9t5xlUY4wv': 'Coppel.com en tienda',
    '5Rlem1oRt48wJA4vDoHEYKyA6byQjqR9': 'Coppel.com',

    // PROD
    '9F0BL6kJyKI5XWrMqzZE0Mv3CrsJU1lj': 'App Coppel - Android', // Android
    'fYCHK31lNFHtTIpdDNgMVIZQ9iksDXau': 'App Coppel - iOS', // iOS
    'Wv0tGu9r79xf9HzPlTkZ5mmUJJqphEc8': 'Coppel.com en tienda',
    'ylnRm6q0UZT46KqEDFXCFL4K6BnY4tm7': 'Coppel.com',
};

/**
 * Resuelve el canal de analítica según el clientId del contexto de Auth0.
 * Si el clientId no está en el mapa, retorna 'Coppel.com' como fallback.
 */
export function getCanalByClientId(): Canal {
  const clientId = window.universal_login_context?.client?.id ?? '';
  return CLIENT_ID_CANAL_MAP[clientId];
}
