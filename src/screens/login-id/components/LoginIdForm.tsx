import { useForm } from "react-hook-form";

import {
  useErrors,
  useLoginIdentifiers,
  usePasskeyAutofill,
} from "@auth0/auth0-acul-react/login-id";
import type {
  ErrorItem,
  IdentifierType,
  LoginOptions,
} from "@auth0/auth0-acul-react/types";

import Captcha from "@/components/Captcha/index";
import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import ULThemeCountryCodePicker from "@/components/ULThemeCountryCodePicker";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { useCaptcha } from "@/hooks/useCaptcha";
import { useAuthSession } from "@/hooks/useAuthSession";
import {
  isPhoneNumberSupported,
  transformAuth0CountryCode,
} from "@/utils/helpers/countryUtils";
import { getIdentifierDetails } from "@/utils/helpers/identifierUtils";

import { ULThemeCheckbox } from "@/components/ULThemeCheckbox";

import { useState } from "react";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

function LoginIdForm() {
  const {
    texts,
    locales,
    captcha,
    countryCode,
    countryPrefix,
    isCaptchaAvailable,
    isPasskeyEnabled,
    showPasskeyAutofill,
    handleLoginId,
    handlePickCountryCode,
  } = useLoginIdManager();

  const { setAuthUser } = useAuthSession();

  const activeIdentifiers = useLoginIdentifiers();

  // Use helper to determine placeholder based on active identifiers
  const identifierDetails = getIdentifierDetails(
    (activeIdentifiers || undefined) as IdentifierType[] | undefined,
    texts
  );

  const form = useForm<LoginOptions>({
    defaultValues: {
      username: "",
      captcha: "",
    },
    reValidateMode: "onBlur",
  });

  const {
    formState: { isSubmitting },
  } = form;

  // Use locales as fallback to SDK texts
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : locales?.loginIdForm?.captchaLabel;
  const continueButtonText =
    locales?.loginIdForm?.continueButtonText || texts?.buttonText;

  const { captchaConfig, captchaProps, captchaValue } = useCaptcha(
    captcha || undefined,
    captchaLabel
  );

  // Enable passkey autofill for identifier field if supported and configured to show.
  if (isPasskeyEnabled && showPasskeyAutofill) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    usePasskeyAutofill();
  }

  const { errors, hasError, dismiss } = useErrors();

  // Get field-specific SDK errors
  const usernameSDKError = errors.byField("username")[0]?.message;
  const captchaSDKError = errors.byField("captcha")[0]?.message;

  // Get general errors (not field-specific)
  const generalErrors: ErrorItem[] = errors
    .byType("auth0")
    .filter((err) => !err.field);

  const shouldShowCountryPicker = isPhoneNumberSupported(
    activeIdentifiers || []
  );

  // Estado del checkbox de términos y condiciones
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Proper submit handler with form data
  const onSubmit = async (data: LoginOptions) => {
    // Save email to session for page (development feature)
    setAuthUser({
      email: data.username,
      name: "Usuario autenticado",
    });

    await handleLoginId({
      username: data.username,
      captcha: isCaptchaAvailable && captchaValue ? captchaValue : undefined,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                  {error.message || locales?.errors?.errorOccurred}
                </ULThemeAlertTitle>
              </ULThemeAlert>
            ))}
          </div>
        )}

        {/* Country Code Picker - only show if phone numbers are supported */}
        {shouldShowCountryPicker && (
          <div className="mb-4">
            <ULThemeCountryCodePicker
              selectedCountry={transformAuth0CountryCode(
                countryCode,
                countryPrefix
              )}
              onClick={handlePickCountryCode}
              fullWidth
              placeholder={locales?.loginIdForm?.selectCountryPlaceholder}
            />
          </div>
        )}

        {/* Username Identifier input field */}
        <FormField
          control={form.control}
          name="username"
          rules={{
            required: locales?.errors?.identifierRequired,
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeFloatingLabelField
                {...field}
                label={identifierDetails.label}
                type={identifierDetails.type}
                autoComplete={identifierDetails.autoComplete}
                autoFocus
                error={!!fieldState.error || !!usernameSDKError}
              />
              <ULThemeFormMessage
                sdkError={usernameSDKError}
                hasFormError={!!fieldState.error}
              />
            </FormItem>
          )}
        />

        {/* Captcha Field */}
        {isCaptchaAvailable && captchaConfig && (
          <Captcha
            control={form.control}
            name="captcha"
            captcha={captchaConfig}
            {...captchaProps}
            sdkError={captchaSDKError}
            rules={{
              required: locales?.errors?.captchaCompletionRequired,
            }}
          />
        )}

        {/* Checkbox de términos y condiciones */}
        <label className="flex items-start gap-3 mb-4 mt-2 cursor-pointer">
          <ULThemeCheckbox
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked === true)}
          />
          <span className="text-sm text-body-text leading-relaxed">
            Acepto los{" "}
            <a
              href="https://www.coppel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link-focus underline"
            >
              Términos y Condiciones
            </a>
            {" "}y el{" "}
            <a
              href="https://www.coppel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link-focus underline"
            >
              Aviso de Privacidad
            </a>
          </span>
        </label>

        <ULThemeButton type="submit" className="w-full" disabled={isSubmitting || !termsAccepted}>
          {continueButtonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default LoginIdForm;
