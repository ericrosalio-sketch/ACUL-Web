import { ULThemeButton } from "@/components/ULThemeButton";
import ULThemeLink from "@/components/ULThemeLink";

import { usePasskeyEnrollmentManager } from "../hooks/usePasskeyEnrollmentManager";

function Footer() {
  const { links, texts, locales, abortPasskeyEnrollment } =
    usePasskeyEnrollmentManager();

  // Use Locales as fallback to SDK texts
  const continueButtonText =
    locales.footer.continueButtonText || texts?.continueButtonText;
  const backButtonText = locales.footer.backButtonText || texts?.backButtonText;

  return (
    <>
      <div className="mt-4 text-center">
        {continueButtonText && (
          <ULThemeButton
            variant="link"
            size="link"
            onClick={() => abortPasskeyEnrollment()}
          >
            {continueButtonText}
          </ULThemeButton>
        )}
      </div>
      <div className="mt-4 text-center">
        {links?.back && (
          <ULThemeLink href={links?.back}>{backButtonText}</ULThemeLink>
        )}
      </div>
    </>
  );
}

export default Footer;
