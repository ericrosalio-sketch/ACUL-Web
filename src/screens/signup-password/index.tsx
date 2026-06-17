import { useEffect } from "react";

import CoppelPageLayout from "@/components/CoppelPageLayout";
import ULThemeCard from "@/components/ULThemeCard";
import { getCanalByClientId } from "@/utils/helpers/canalUtils";
import { pushPageView } from "@/utils/helpers/dataLayerUtils";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Footer from "./components/Footer";
import Header from "./components/Header";
import SignupPasswordForm from "./components/SignupPasswordForm";
import { useSignupPasswordManager } from "./hooks/useSignupPasswordManager";

function SignupPasswordScreen() {
  // Extracting attributes from hook made out of SignupPasswordInstance class of Auth0 React ACUL SDK
  const { signupPassword, texts, locales } = useSignupPasswordManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(signupPassword);

  // Actualiza el título del documento y dispara el page view al montar la pantalla.
  // document.title se asigna dentro de useEffect para que el narrador anuncie el título
  // correcto en el primer render (evita que lea el título del render anterior).
  useEffect(() => {
    pushPageView("/crear-cuenta", "Registro de clientes", getCanalByClientId());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <CoppelPageLayout className="theme-universal" pageTitle={locales?.page?.title || texts?.pageTitle}>
      <ULThemeCard className="w-full gap-0">
        <Header />
        <SignupPasswordForm />
        <Footer />
      </ULThemeCard>
    </CoppelPageLayout>
  );
}

export default SignupPasswordScreen;
