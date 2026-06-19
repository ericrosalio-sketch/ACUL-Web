import CoppelPageLayout from "@/components/CoppelPageLayout";
import ULThemeCard from "@/components/ULThemeCard";
import { applyAuth0Theme } from "@/utils/theme";

import Header from "./components/Header";
import ResendEmail from "./components/ResendEmail";
import { useResetPasswordEmailManager } from "./hooks/useResetPasswordEmailManager";

function ResetPasswordEmailScreen() {
  // Extracting attributes from hook made out of ResetPasswordEmailInstance class of Auth0 React SDK
  const { resetPasswordEmail, texts, locales } = useResetPasswordEmailManager();

  // Apply theme from SDK instance when screen loads
  applyAuth0Theme(resetPasswordEmail);
  document.title = texts?.pageTitle || locales.pageTitle;

  return (
    // Applying UDS theme overrides using the "theme-universal" class
    <CoppelPageLayout className="theme-universal">
      <div className="w-full max-w-[400px] pt-20">
        <ULThemeCard className="w-full gap-6 p-[24px]">
          <Header />
          <ResendEmail />
        </ULThemeCard>
      </div>
    </CoppelPageLayout>
  );
}

export default ResetPasswordEmailScreen;
