import { useEffect } from "react";

import CoppelPageLayout from "@/components/CoppelPageLayout";
import ULThemeCard from "@/components/ULThemeCard";
import { getCanalByClientId } from "@/utils/helpers/canalUtils";
import { pushPageView } from "@/utils/helpers/dataLayerUtils";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

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

  return (
    <CoppelPageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        {/* Header (logo + título) — ancho completo */}
        <Header />

        {/* Contenedor principal con separación clara entre formulario y botones sociales */}
        <div className="flex flex-col gap-6 items-stretch mt-2">

          {/* ── Sección superior: formulario y footer ── */}
          <div className="flex-1 flex flex-col">
            <SignupIdForm />
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
          {showSeparator && (
            <div className="flex flex-col justify-center gap-3">
              <AlternativeLogins />
            </div>
          )}
        </div>
      </ULThemeCard>
    </CoppelPageLayout>
  );
}

export default SignupIdScreen;
