import { useRef } from "react";
import { useForm } from "react-hook-form";

import ULThemeSubtitle from "@/components/ULThemeSubtitle";

import {
  useErrors,
  usePasskeyAutofill
} from "@auth0/auth0-acul-react/login-id";
import type {
  ErrorItem,
  LoginOptions
} from "@auth0/auth0-acul-react/types";

import Captcha from "@/components/Captcha/index";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { useCaptcha } from "@/hooks/useCaptcha";
import { useAuthSession } from "@/hooks/useAuthSession";
import { getCanalByClientId } from "@/utils/helpers/canalUtils";
import { pushClicHipervinculo } from "@/utils/helpers/dataLayerUtils";


import { useLoginIdManager } from "../hooks/useLoginIdManager";
import { ULThemeStaticLabelField } from "@/components/form/ULThemeStaticLabelField";

function LoginIdForm() {
  const {
    texts,
    locales,
    captcha,
    isCaptchaAvailable,
    isPasskeyEnabled,
    showPasskeyAutofill,
    handleLoginId,
  } = useLoginIdManager();

  const { setAuthUser } = useAuthSession();

  const form = useForm<LoginOptions>({
    defaultValues: {
      username: "",
      captcha: "",
    },
    reValidateMode: "onBlur",
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  const description = locales.header.description || texts?.description;

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


  // Rastrear si el envío fue por Enter o por clic en Continuar
  const submissionType = useRef<"Continuar" | "Enter">("Continuar");

  // Validation for enabling submit button (email or phone must be valid)
  const isValidEmail = (value: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  const userEmail = watch("username") ?? "";
  const isEmailValid = isValidEmail(userEmail);

  const isValidPhone = (value: string) =>
    /^\+?[1-9]\d{9}$/.test(value); // Simple E.164 format validation
  const userPhone = watch("username") ?? "";
  const isPhoneValid = isValidPhone(userPhone);

  const isFormValid = isEmailValid || isPhoneValid;

  // Proper submit handler with form data
  const onSubmit = async (data: LoginOptions) => {
    // dataLayer: event 'clicClienteDigital' on login submission (Continuar / Enter)
    pushClicHipervinculo(submissionType.current, "/login-universal", getCanalByClientId());

    let formattedUsername = data.username.trim();
    if (isValidPhone(formattedUsername) && !formattedUsername.startsWith("+")) {
      formattedUsername = `+52${formattedUsername}`;
    }

    // Se puede iniciar sesión con correo o numero telofónico, el backend de Auth0 lo detecta automáticamente, solo hay que enviar el valor en el campo "username"
    setAuthUser({
      email: formattedUsername,
      name: "Usuario autenticado",
    });

    await handleLoginId({
      username: formattedUsername,
      captcha: isCaptchaAvailable && captchaValue ? captchaValue : undefined,
    });
  };


  return (
    <Form {...form}>
      <ULThemeSubtitle>
        {description}
      </ULThemeSubtitle>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submissionType.current = "Enter";
          }
        }}
      >
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

        {/* Username Identifier input field */}
        <FormField
          control={form.control}
          name="username"
          rules={{
            required: locales?.errors?.identifierRequired,
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemeStaticLabelField
                {...field}
                label={locales.form.fields.username?.label}
                placeholder={locales.form.fields.username?.placeholder}
                type={"text"}
                autoComplete={"username"}
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

        <ULThemeButton
          type="submit"
          className="w-full"
          disabled={isSubmitting || !isFormValid}
          onClick={() => {
            submissionType.current = "Continuar";
          }}
        >
          {continueButtonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default LoginIdForm;
