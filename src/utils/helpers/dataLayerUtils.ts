/**
 * dataLayerUtils.ts
 *
 * Funciones helper para disparar eventos de analítica al dataLayer (GTM).
 * Centraliza todos los `window.dataLayer.push(...)` del flujo de registro (signup).
 *
 * Uso:
 *   import { pushPageView } from '@/utils/helpers/dataLayerUtils';
 *   pushPageView('/crear-cuenta', 'Registro de clientes', canal);
 */

import type { Canal } from "./canalUtils";

// ─────────────────────────────────────────────────────────────────────────────
// Tipos internos
// ─────────────────────────────────────────────────────────────────────────────

/** Tipo de cuenta según el identificador con el que se registra el usuario */
export type CuentaTipoForm = "Correo" | "Celular";

/** Tipo de cuenta cuando se usa login social / passkey */
export type CuentaTipoSocial = "Passkey" | "Google" | "Apple" | "Microsoft";

/** Texto que describe cómo se disparó el submit del formulario */
export type InteraccionNombreForm =
  | "Continuar"
  | "Enter"
  | "Crear cuenta"
  | "Crear cuenta enter";

// ─────────────────────────────────────────────────────────────────────────────
// Helper interno — escritura segura al dataLayer
// ─────────────────────────────────────────────────────────────────────────────

function push(data: Record<string, unknown>): void {
  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }
  window.dataLayer.push(data);
}

// ─────────────────────────────────────────────────────────────────────────────
// Eventos públicos
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Page view general — se dispara al montar cualquier pantalla de registro.
 *
 * event: 'pvOKTAGeneral'
 *
 * @param page    Path amigable de la página (ej. '/crear-cuenta')
 * @param titulo  Título de la página (ej. 'Registro de clientes')
 * @param canal   Canal detectado por getCanalByClientId()
 */
export function pushPageView(
  page: string,
  titulo: string,
  canal: Canal
): void {
  push({
    pagina: { page, titulo },
    canal,
    event: "pvOKTAGeneral",
  });
}

/**
 * Click en el botón Continuar / Crear cuenta, o Enter en el campo de contraseña.
 *
 * event: 'crearCuenta'
 *
 * @param interaccionNombre  'Continuar' | 'Enter' | 'Crear cuenta' | 'Crear cuenta enter'
 * @param page               Path amigable de la página
 * @param cuentaTipo         'Correo' | 'Celular'
 * @param canal              Canal detectado por getCanalByClientId()
 */
export function pushCrearCuentaForm(
  interaccionNombre: InteraccionNombreForm,
  page: string,
  cuentaTipo: CuentaTipoForm,
  canal: Canal
): void {
  push({
    interaccionNombre,
    page,
    cuentaTipo,
    canal,
    event: "crearCuenta",
  });
}

/**
 * Click en alguno de los botones de login social (Google, Apple, Microsoft, Passkey).
 *
 * event: 'crearCuenta'
 *
 * @param cuentaTipo  'Passkey' | 'Google' | 'Apple' | 'Microsoft'
 * @param page        Path amigable de la página
 * @param canal       Canal detectado por getCanalByClientId()
 */
export function pushCrearCuentaSocial(
  cuentaTipo: CuentaTipoSocial,
  page: string,
  canal: Canal
): void {
  push({
    interaccionNombre: "Continuar social",
    page,
    cuentaTipo,
    canal,
    event: "crearCuenta",
  });
}

/**
 * Click en el link "Inicia sesión" del footer de las pantallas de registro.
 *
 * event: 'clicClienteDigital'
 *
 * @param page   Path amigable de la página donde ocurrió el click
 * @param canal  Canal detectado por getCanalByClientId()
 */
export function pushIniciarSesion(page: string, canal: Canal): void {
  push({
    interaccionNombre: "Inicia Sesión",
    page,
    canal,
    event: "clicClienteDigital",
  });
}

/**
 * Click en cualquier opción del header simplificado (logo o "Volver a inicio").
 *
 * event: 'clicMenuSuperiorGeneral'
 *
 * @param interaccionNombre  'Logo Coppel' | 'Volver a inicio'
 * @param canal              Canal detectado por getCanalByClientId()
 */
export function pushMenuSuperior(
  interaccionNombre: "Logo Coppel" | "Volver a inicio",
  canal: Canal
): void {
  push({
    page: `/menu-superior/${canal}`,
    interaccionNombre,
    event: "clicMenuSuperiorGeneral",
  });
}

/**
 * Click en cualquier opción del footer (Aviso de privacidad, Términos y condiciones, etc.).
 *
 * event: 'clicMenuInferiorGeneral'
 *
 * @param interaccionNombre  Nombre de la opción seleccionada (ej. 'Aviso de privacidad')
 * @param canal              Canal detectado por getCanalByClientId()
 */
export function pushMenuInferior(
  interaccionNombre: string,
  canal: Canal
): void {
  push({
    page: `/menu-inferior/${canal}`,
    interaccionNombre,
    event: "clicMenuInferiorGeneral",
  });
}

/**
 * Cuenta creada exitosamente.
 * ⚠️  La ubicación exacta de esta llamada aún está por definir
 *     (depende del flujo configurado desde el tenant de Auth0).
 *     La función está lista para ser invocada en el punto correcto.
 *
 * event: 'crearCuentaConDatos'
 *
 * @param page       Path amigable de la página (ej. '/crear-cuenta')
 * @param cuentaTipo 'Correo' | 'Celular'
 * @param userId     ID de usuario generado en la tabla maestra
 * @param canal      Canal detectado por getCanalByClientId()
 */
export function pushCrearCuentaConDatos(
  page: string,
  cuentaTipo: CuentaTipoForm,
  userId: string,
  canal: Canal
): void {
  push({
    interaccionNombre: "Creación de cuenta con éxito",
    page,
    cuentaTipo,
    userId,
    canal,
    event: "crearCuentaConDatos",
  });
}
