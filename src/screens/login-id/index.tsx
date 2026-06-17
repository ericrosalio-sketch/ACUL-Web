import CoppelPageLayout from "@/components/CoppelPageLayout";
import ULThemeCard from "@/components/ULThemeCard";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import AlternativeLogins from "./components/AlternativeLogins";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LoginIdForm from "./components/LoginIdForm";
import { useLoginIdManager } from "./hooks/useLoginIdManager";
import { applyScreenThemeOverrides } from "@/utils/theme/themeOverrides";

import { useEffect } from "react";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import { getCanalByClientId } from "@/utils/helpers/canalUtils";
import { pushPageView } from "@/utils/helpers/dataLayerUtils";

function LoginIdScreen() {
  // Extracting attributes from hook made out of LoginIdInstance class of Auth0 React ACUL SDK
  const { loginId, texts, locales, alternateConnections } =
    useLoginIdManager();

  // dataLayer: evento pvOKTAGeneral al montar la pantalla "Login (Correo/Telefono)"
  useEffect(() => {
    pushPageView("/login-universal", "Inicio de sesión - Universal", getCanalByClientId());
  }, []);


  // Variables CSS que esta pantalla protege del Dashboard branding.
  // Edita estos valores para personalizar el aspecto de la pantalla de login-id
  // sin afectar las demás pantallas.
  const LOGIN_ID_THEME_OVERRIDES = [
    {
      // Fuerza el layout a "bottom" para que los botones sociales
      variable: "--ul-theme-widget-social-buttons-layout",
      value: "bottom",
    },
  ];

  // Aplica el tema del Dashboard de Auth0 primero (branding general del tenant)
  applyAuth0Theme(loginId);
  
  // Mostrar separador solo si hay conexiones sociales disponibles
  const showSeparator = alternateConnections && alternateConnections.length > 0;
  const separatorText = locales?.page?.separator || texts?.separatorText;

  // Leer la posición configurada desde la CSS variable (set por applyScreenThemeOverrides)
  const socialButtonsPosition =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--ul-signup-id-social-buttons-position")
      .trim() || "bottom";

  // Bloque reutilizable: separador + botones sociales
  const renderSocialLogins = (alignment: "top" | "bottom") => (
    <>
      {alignment === "bottom" && showSeparator && (
        <ULThemeSeparator text={separatorText} />
      )}
      <AlternativeLogins />
      {alignment === "top" && showSeparator && (
        <ULThemeSeparator text={separatorText} />
      )}
    </>
  );

  // Luego aplica los overrides específicos de esta pantalla (tienen mayor prioridad)
  applyScreenThemeOverrides(LOGIN_ID_THEME_OVERRIDES);

  return (
    // CoppelPageLayout incluye el header y footer globales de Coppel
    // (extraídos del branding_templates/universal_login.html de auth0-repo)
    // y envuelve el contenido con el layout de página completa.
    <CoppelPageLayout className="theme-universal" pageTitle={locales?.page?.title}>
      <ULThemeCard className="w-full gap-4">
        {/* Header (logo + título) — ancho completo */}
        <Header />

        {/* ── Sociales arriba cuando position = "top" ── */}
        {socialButtonsPosition === "top" && renderSocialLogins("top")}

        {/* ── Sección superior: formulario y footer ── */}
        <LoginIdForm />
        <Footer />

        {/* ── Sociales abajo cuando position = "bottom" ── */}
        {socialButtonsPosition === "bottom" && renderSocialLogins("bottom")}
      </ULThemeCard>
    </CoppelPageLayout>
  );
}

export default LoginIdScreen;
