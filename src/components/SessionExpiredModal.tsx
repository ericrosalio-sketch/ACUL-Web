import { ULThemeButton } from "@/components/ULThemeButton";

/**
 * Props del modal de sesión expirada.
 * Todos los textos se reciben desde fuera para que cada pantalla
 * pueda usar sus propios locales.
 */
export interface SessionExpiredModalProps {
  /** Controla si el modal es visible */
  isVisible: boolean;
  /** Callback al presionar el botón de cerrar sesión */
  onLogout: () => void;
  /** Título del modal, ej: "Tu sesión ha expirado" */
  title: string;
  /** Descripción del modal, ej: "Por seguridad, vuelve a iniciar sesión." */
  description: string;
  /** Etiqueta del botón, ej: "Cerrar sesión" */
  buttonLabel: string;
}

/**
 * Modal genérico de sesión expirada.
 *
 * No tiene lógica interna — solo presentación.
 * Bloquea la interacción con la pantalla subyacente.
 * Usa las variables CSS del tema (--ul-theme-*) para respetar el branding.
 *
 * @example
 * <SessionExpiredModal
 *   isVisible={isSessionExpired}
 *   onLogout={handleLogout}
 *   title={locales.sessionExpired.title}
 *   description={locales.sessionExpired.description}
 *   buttonLabel={locales.sessionExpired.logoutButton}
 * />
 */
export function SessionExpiredModal({
  isVisible,
  onLogout,
  title,
  description,
  buttonLabel,
}: SessionExpiredModalProps) {
  if (!isVisible) return null;

  return (
    /* Overlay — bloquea toda la pantalla */
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="session-expired-title"
      aria-describedby="session-expired-description"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Tarjeta del modal */}
      <div
        style={{
          background: "var(--ul-theme-widget-background-color, #ffffff)",
          borderRadius: "var(--ul-theme-widget-border-radius, 8px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          padding: "2rem",
          maxWidth: "360px",
          width: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          textAlign: "center",
        }}
      >
        {/* Icono de reloj / advertencia */}
        <span
          aria-hidden="true"
          style={{
            fontSize: "3rem",
            lineHeight: 1,
          }}
        >
          ⏱️
        </span>

        {/* Título */}
        <h2
          id="session-expired-title"
          style={{
            margin: 0,
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "var(--ul-theme-color-header, #1f2937)",
            fontFamily: "var(--ul-theme-font-body-weight-normal, inherit)",
          }}
        >
          {title}
        </h2>

        {/* Descripción */}
        <p
          id="session-expired-description"
          style={{
            margin: 0,
            fontSize: "0.9rem",
            color: "var(--ul-theme-color-body, #6b7280)",
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>

        {/* Botón de logout */}
        <ULThemeButton
          onClick={onLogout}
          className="w-full mt-2"
          type="button"
        >
          {buttonLabel}
        </ULThemeButton>
      </div>
    </div>
  );
}

export default SessionExpiredModal;
