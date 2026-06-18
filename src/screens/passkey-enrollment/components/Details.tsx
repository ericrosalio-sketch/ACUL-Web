import { useErrors } from "@auth0/auth0-acul-react/passkey-enrollment";
import { CustomOptions, ErrorItem } from "@auth0/auth0-acul-react/types";

import { FingerprintIcon, MobileIcon, ShieldIcon } from "@/assets/icons";
import { ULThemeButton } from "@/components/ULThemeButton";
import ULThemeAlert, { ULThemeAlertTitle } from "@/components/ULThemeError";
import { getCanalByClientId } from "@/utils/helpers/canalUtils";
import { pushCrearLlaveDigital } from "@/utils/helpers/dataLayerUtils";

import { usePasskeyEnrollmentManager } from "../hooks/usePasskeyEnrollmentManager";

/**
 * Passkeys Enrollment Benefits Details Component
 * This component renders the details about the benefits of using passkeys.
 */
function Details() {
  // Extract necessary methods and properties from the custom hook
  const { continuePasskeyEnrollment, texts, locales } =
    usePasskeyEnrollmentManager();

  // Use Locales as fallback to SDK texts
  const buttonText =
    texts?.createButtonText || locales.details.createPasskeyText;
  const passkeyBenefit1Title =
    texts?.passkeyBenefit1Title || locales.details.passkeyBenefit1Title;
  const passkeyBenefit1Description =
    texts?.passkeyBenefit1Description ||
    locales.details.passkeyBenefit1Description;
  const passkeyBenefit2Title =
    texts?.passkeyBenefit2Title || locales.details.passkeyBenefit2Title;
  const passkeyBenefit2Description =
    texts?.passkeyBenefit2Description ||
    locales.details.passkeyBenefit2Description;
  const passkeyBenefit3Title =
    texts?.passkeyBenefit3Title || locales.details.passkeyBenefit3Title;
  const passkeyBenefit3Description =
    texts?.passkeyBenefit3Description ||
    locales.details.passkeyBenefit3Description;

  const { errors, hasError, dismiss } = useErrors();

  // Get general errors (not field-specific)
  const generalErrors: ErrorItem[] = errors
    .byType("auth0")
    .filter((err) => !err.field);

  /**
   * Handles form submission.
   *
   * @param data - (Optional) Form custom data
   */
  const onCreateClick = async (data?: CustomOptions) => {
    // Disparar evento de dataLayer
    const canal = getCanalByClientId();
    // TODO: Determinar el tipo de cuenta real (Correo, Celular, Google, etc.)
    // Por ahora se envía "Correo" como valor por defecto, pero debería obtenerse del contexto del usuario
    pushCrearLlaveDigital("/crear-llave-digital", "Correo", canal);

    continuePasskeyEnrollment(data);
  };

  return (
    <>
      {/* Display general errors */}
      {hasError && generalErrors.length > 0 && (
        <div className="space-y-3 mb-4">
          {generalErrors.map((error) => (
            <ULThemeAlert
              key={error.id}
              variant="destructive"
              onDismiss={() => dismiss(error.id)}
            >
              <ULThemeAlertTitle>
                {error.message || locales.errors.errorOccurred}
              </ULThemeAlertTitle>
            </ULThemeAlert>
          ))}
        </div>
      )}

      <div
        className="w-full bg-[#F3F3F3] rounded-[16px] p-6 flex flex-col gap-8 mb-6"
        role="list"
        aria-label="Beneficios de crear un acceso personal"
      >
        {/* Benefit 1 */}
        <div className="flex flex-row items-start gap-4 w-full" role="listitem">
          <div className="shrink-0" aria-hidden="true">
            <FingerprintIcon className="w-17 h-17" />
          </div>
          <div className="flex flex-col pt-1">
            <h3 className="font-bold leading-[150%] text-[#081754] text-[16px]">
              {passkeyBenefit1Title}
            </h3>
            <p className="leading-[150%] text-[#081754] text-[16px] mt-2">
              {passkeyBenefit1Description}
            </p>
          </div>
        </div>

        {/* Benefit 2 */}
        <div className="flex flex-row items-start gap-4 w-full" role="listitem">
          <div className="shrink-0" aria-hidden="true">
            <MobileIcon className="w-17 h-17" />
          </div>
          <div className="flex flex-col pt-1">
            <h3 className="font-bold leading-[150%] text-[#081754] text-[16px]">
              {passkeyBenefit2Title}
            </h3>
            <p className="leading-[150%] text-[#081754] text-[16px] mt-2">
              {passkeyBenefit2Description}
            </p>
          </div>
        </div>

        {/* Benefit 3 */}
        <div className="flex flex-row items-start gap-4 w-full" role="listitem">
          <div className="shrink-0" aria-hidden="true">
            <ShieldIcon className="w-17 h-17" />
          </div>
          <div className="flex flex-col pt-1">
            <h3 className="font-bold leading-[150%] text-[#081754] text-[16px]">
              {passkeyBenefit3Title}
            </h3>
            <p className="leading-[150%] text-[#081754] text-[16px] mt-2">
              {passkeyBenefit3Description}
            </p>
          </div>
        </div>
      </div>

      {/* Create Passkey button */}
      <ULThemeButton
        className="w-full !h-12 !rounded-[24px] !bg-[#1C42E8] hover:!bg-[#1C42E8]/90 !text-white !font-bold !text-[16px] !leading-[150%] !border-0 !shadow-none before:!hidden"
        onClick={() => onCreateClick({ key: "passkey" })}
      >
        {buttonText}
      </ULThemeButton>
    </>
  );
}

export default Details;
