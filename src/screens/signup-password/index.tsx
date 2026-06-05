import CoppelPageLayout from "@/components/CoppelPageLayout";
import ULThemeCard from "@/components/ULThemeCard";
import { applyAuth0Theme } from "@/utils/theme/themeEngine";

import Footer from "./components/Footer";
import Header from "./components/Header";
import SignupPasswordForm from "./components/SignupPasswordForm";
import { useSignupPasswordManager } from "./hooks/useSignupPasswordManager";

function SignupPasswordScreen() {
  // Extracting attributes from hook made out of SignupPasswordInstance class of Auth0 React ACUL SDK
  const { signupPassword, texts, locales } = useSignupPasswordManager();

  document.title = locales.page.title || texts?.pageTitle || "";

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(signupPassword);

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <CoppelPageLayout className="theme-universal">
      <ULThemeCard className="w-full max-w-[400px] gap-0">
        <Header />
        <SignupPasswordForm />
        <Footer />
      </ULThemeCard>
    </CoppelPageLayout>
  );
}

export default SignupPasswordScreen;
