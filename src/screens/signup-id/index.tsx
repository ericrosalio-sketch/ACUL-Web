import CoppelPageLayout from "@/components/CoppelPageLayout";
import ULThemeCard from "@/components/ULThemeCard";
import ULThemeSeparator from "@/components/ULThemeSeparator";
import { extractTokenValue } from "@/utils/helpers/tokenUtils";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import AlternativeLogins from "./components/AlternativeLogins";
import Footer from "./components/Footer";
import Header from "./components/Header";
import SignupIdForm from "./components/SignupIdForm";
import { useSignupIdManager } from "./hooks/useSignupIdManager";
import { applyScreenThemeOverrides } from "@/utils/theme/themeOverrides";

function SignupIdScreen() {
  // Extracting attributes from hook made out of SignupIdInstance class of Auth0 React ACUL SDK
  const { signupId, texts, alternateConnections, locales } =
    useSignupIdManager();

  const showSeparator = alternateConnections && alternateConnections.length > 0;

  const separatorText = texts?.separatorText || locales.page.separator;
  document.title = texts?.pageTitle || locales.page.title;

  applyAuth0Theme(signupId);

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

  // Luego aplica los overrides específicos de esta pantalla (tienen mayor prioridad)
  applyScreenThemeOverrides(LOGIN_ID_THEME_OVERRIDES);


  const socialLoginAlignment = extractTokenValue(
    "--ul-theme-widget-social-buttons-layout"
  );

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
    // Applying UDS theme overrides using the "theme-universal" class
    <CoppelPageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[389px] max-h-[610px] gap-0">
        <Header />
        {socialLoginAlignment === "top" && renderSocialLogins("top")}
        <SignupIdForm />
        <Footer />
        {socialLoginAlignment === "bottom" && renderSocialLogins("bottom")}
      </ULThemeCard>
    </CoppelPageLayout>
  );
}

export default SignupIdScreen;
