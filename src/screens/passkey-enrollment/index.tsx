import CoppelPageLayout from "@/components/CoppelPageLayout";
import ULThemeCard from "@/components/ULThemeCard";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Details from "./components/Details";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { usePasskeyEnrollmentManager } from "./hooks/usePasskeyEnrollmentManager";

function PasskeyEnrollmentScreen() {
  // Extracting attributes from hook made out of PasskeyEnrollmentInstance class of Auth0 React ACUL SDK
  const { texts, locales, passkeyEnrollmentInstance } =
    usePasskeyEnrollmentManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(passkeyEnrollmentInstance);

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <CoppelPageLayout className="theme-universal" pageTitle={locales?.page?.title || texts?.pageTitle}>
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <Details />
        <Footer />
      </ULThemeCard>
    </CoppelPageLayout>
  );
}

export default PasskeyEnrollmentScreen;
