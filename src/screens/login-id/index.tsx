import CoppelPageLayout from "@/components/CoppelPageLayout";
import ULThemeCard from "@/components/ULThemeCard";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import AlternativeLogins from "./components/AlternativeLogins";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginIdForm from "./components/LoginIdForm";
import { useLoginIdManager } from "./hooks/useLoginIdManager";
import { applyScreenThemeOverrides } from "@/utils/theme/themeOverrides";

function LoginIdScreen() {
  // Extracting attributes from hook made out of LoginIdInstance class of Auth0 React ACUL SDK
  const { loginId, texts, locales, isPasskeyEnabled, alternateConnections } =
    useLoginIdManager();

  // Check whether separator component needs to be rendered based on passkey or other social connections
  const showSeparator =
    isPasskeyEnabled ||
    (alternateConnections && alternateConnections.length > 0);

  // Other Texts
  const separatorText = texts?.separatorText || locales?.page?.orText;
  document.title = texts?.pageTitle || locales?.page?.title;

  // Variables CSS que esta pantalla protege del Dashboard branding.
  // Edita estos valores para personalizar el aspecto de la pantalla de login-id
  // sin afectar las demás pantallas.
  const LOGIN_ID_THEME_OVERRIDES = [
    {
      // 🔑 CLAVE: Fuerza el layout a "bottom" para que los botones sociales
      // siempre aparezcan ABAJO del formulario, ignorando la config del Dashboard.
      // Solo funciona si está el layout vertical (horizontal coloca los botones en la derecha)
      variable: "--ul-theme-widget-social-buttons-layout",
      value: "bottom",
    },
  ];

  // Aplica el tema del Dashboard de Auth0 primero (branding general del tenant)
  applyAuth0Theme(loginId);
  
  // Luego aplica los overrides específicos de esta pantalla (tienen mayor prioridad)
  applyScreenThemeOverrides(LOGIN_ID_THEME_OVERRIDES);

  return (
    // CoppelPageLayout incluye el header y footer globales de Coppel
    // (extraídos del branding_templates/universal_login.html de auth0-repo)
    // y envuelve el contenido con el layout de página completa.
    <CoppelPageLayout className="theme-universal">
      {/*
        Layout de la card ampliado a max-w-[640px] para acomodar el diseño horizontal.
        En pantallas pequeñas (< md) el layout regresa a columna vertical.
      */}
      <ULThemeCard className="w-full max-w-sm gap-0">
        {/* Header (logo + título) — ancho completo */}
        <Header />
        {/* Contenedor principal con gap entre secciones y separación clara entre formulario y botones sociales */}
        <div className="flex flex-col gap-6 items-stretch mt-2">

          {/* ── Sección superior: formulario y footer ── */}
          <div className="flex-1 flex flex-col">
            <LoginIdForm />
            <Footer />
          </div>

          {/* ── Separador horizontal ── */}
          {showSeparator && (
            <div className="flex items-center gap-3 my-1">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 shrink-0">{separatorText}</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          )}

          {/* ── Sección inferior: botones sociales ── */}
          {(alternateConnections && alternateConnections.length > 0 || isPasskeyEnabled) && (
            <div className="flex flex-col justify-center gap-3 md:min-w-[300px]">
              <AlternativeLogins />
            </div>
          )}
        </div>
      </ULThemeCard>
    </CoppelPageLayout>
  );
}

export default LoginIdScreen;
