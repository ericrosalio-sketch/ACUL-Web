import CoppelPageLayout from "@/components/CoppelPageLayout";
import ULThemeCard from "@/components/ULThemeCard";
import { applyAuth0Theme } from "@/utils/theme";

import Footer from "./components/Footer";
import Header from "./components/Header";
import ResetPasswordRequestForm from "./components/ResetPasswordRequestForm";
import { useResetPasswordRequestManager } from "./hooks/resetPasswordRequestManager";

function ResetPasswordRequestScreen() {
  // Extracting attributes from hook made out of ResetPasswordRequestInstance class of Auth0 React SDK
  const { resetPasswordRequest, texts, locales } =
    useResetPasswordRequestManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(resetPasswordRequest);
  // Use locale strings with fallback to SDK texts
  document.title = texts?.pageTitle || locales.pageTitle;

  return (
    // CoppelPageLayout incluye el header y footer globales de Coppel
    // (extraídos del branding_templates/universal_login.html de auth0-repo)
    // y envuelve el contenido con el layout de página completa.
    <CoppelPageLayout className="theme-universal">
      <ULThemeCard className="max-w-[400px] gap-6 w-[389px] p-[24px]">
        <Header />
        <ResetPasswordRequestForm />
        <Footer />
      </ULThemeCard>
    </CoppelPageLayout>
  );
}

export default ResetPasswordRequestScreen;
