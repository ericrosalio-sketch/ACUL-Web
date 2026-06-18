import { ULThemeButton } from "@/components/ULThemeButton";
import ULThemeLink from "@/components/ULThemeLink";
import { getCanalByClientId } from "@/utils/helpers/canalUtils";
import { pushContinuarSinLlave } from "@/utils/helpers/dataLayerUtils";

import { usePasskeyEnrollmentManager } from "../hooks/usePasskeyEnrollmentManager";

function Footer() {
  const { links, texts, locales, abortPasskeyEnrollment } =
    usePasskeyEnrollmentManager();

  // Use Locales as fallback to SDK texts
  const continueButtonText =
    texts?.continueButtonText || locales.footer.continueButtonText;
  const backButtonText = texts?.backButtonText || locales.footer.backButtonText;

  const handleAbort = () => {
    const canal = getCanalByClientId();
    pushContinuarSinLlave("/crear-llave-digital", canal);
    abortPasskeyEnrollment();
  };

  const handleBackClick = () => {
    const canal = getCanalByClientId();
    pushContinuarSinLlave("/crear-llave-digital", canal);
  };

  return (
    <>
      <div className="mt-6 text-center w-full">
        {continueButtonText && (
          <ULThemeButton
            variant="outline"
            size="default"
            className="w-full !h-12 !rounded-[24px] !bg-white hover:!bg-[#1C42E8]/5 !text-[#1C42E8] !font-bold !text-[16px] !leading-[150%] !border !border-[#1C42E8] !shadow-none before:!hidden"
            onClick={handleAbort}
          >
            {continueButtonText}
          </ULThemeButton>
        )}
      </div>
      <div className="mt-1 text-center">
        {links?.back && (
          <ULThemeLink href={links?.back} onClick={handleBackClick}>
            {backButtonText}
          </ULThemeLink>
        )}
      </div>
    </>
  );
}

export default Footer;
