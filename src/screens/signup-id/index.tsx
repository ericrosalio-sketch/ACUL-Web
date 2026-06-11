import { useEffect } from "react";

import CoppelPageLayout from "@/components/CoppelPageLayout";
import ULThemeCard from "@/components/ULThemeCard";
import { getCanalByClientId } from "@/utils/helpers/canalUtils";
import { pushPageView } from "@/utils/helpers/dataLayerUtils";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import ULThemeSeparator from "@/components/ULThemeSeparator";

import AlternativeLogins from "./components/AlternativeLogins";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SignupIdForm from "./components/SignupIdForm";
import { useSignupIdManager } from "./hooks/useSignupIdManager";



function SignupIdScreen() {
  const { signupId, texts, locales, alternateConnections } = useSignupIdManager();

  document.title = locales.page.title || texts?.pageTitle || "";

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(signupId);

  // dataLayer: page view al montar la pantalla de creación de cuenta
  useEffect(() => {
    pushPageView("/crear-cuenta", "Registro de clientes", getCanalByClientId());
  }, []);

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

  return (
    <CoppelPageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        {/* Header (logo + título) — ancho completo */}
        <Header />

        {/* ── Sociales arriba cuando position = "top" ── */}
        {socialButtonsPosition === "top" && renderSocialLogins("top")}

        {/* ── Formulario principal ── */}
        <SignupIdForm />
        <Footer />

        {/* ── Sociales abajo cuando position = "bottom" ── */}
        {socialButtonsPosition === "bottom" && renderSocialLogins("bottom")}
      </ULThemeCard>
    </CoppelPageLayout>
  );
}

export default SignupIdScreen;
