import { useForm } from "react-hook-form";

import {
  useErrors,
  useUsernameValidation,
} from "@auth0/auth0-acul-react/signup-id";
import type {
  ErrorItem,
  IdentifierType,
  SignupOptions,
  UsernameValidationResult,
} from "@auth0/auth0-acul-react/types";

import Captcha from "@/components/Captcha/index";
import { ULThemeStaticLabelField } from "@/components/form/ULThemeStaticLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import { useCaptcha } from "@/hooks/useCaptcha";
import { getCanalByClientId } from "@/utils/helpers/canalUtils";
import { pushCrearCuentaForm } from "@/utils/helpers/dataLayerUtils";
import { getIndividualIdentifierDetails } from "@/utils/helpers/identifierUtils";
import { createUsernameValidator } from "@/utils/validations";

import { useSignupIdManager } from "../hooks/useSignupIdManager";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";

function SignupIdForm() {
  const {
    handleSignup,
    isCaptchaAvailable,
    texts,
    captcha,
    locales,
  } = useSignupIdManager();

  const { errors, hasError, dismiss } = useErrors();

  const form = useForm<SignupOptions>({
    defaultValues: {
      email: "",
      username: "",
      phone: "",
      captcha: "",
    },
    reValidateMode: "onBlur",
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  const description = locales.header.description || texts?.description;

  // Get username validation
  const userNameValue = watch("username");
  const {
    isValid: isUsernameValid,
    errors: userNameErrors,
  }: UsernameValidationResult = useUsernameValidation(userNameValue || "");

  // Use locale strings with fallback to SDK texts
  const buttonText = locales.form.button || texts?.buttonText;
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : `${locales.form.fields.captcha.label}*`;

  // Setup captcha with useCaptcha hook
  const { captchaConfig, captchaProps } = useCaptcha(
    captcha || undefined,
    captchaLabel
  );

  // Get general errors (not field-specific)
  const generalErrors: ErrorItem[] = errors
    .byType("auth0")
    .filter((err) => !err.field);

  const captchaSDKError = errors.byField("captcha")[0]?.message;

  // Simplified submit handler matching login-id pattern
  const onSubmit = async (data: SignupOptions) => {
    // dataLayer: evento crearCuenta al dar click en Continuar
    const cuentaTipo = data.phone ? "Celular" : "Correo";
    pushCrearCuentaForm("Continuar", "/crear-cuenta", cuentaTipo, getCanalByClientId());

    await handleSignup(data);
  };

  const renderIdentifierField = (
    identifierType: IdentifierType,
    isRequired: boolean
  ) => {
    const { label, type, autoComplete } = getIndividualIdentifierDetails(
      identifierType,
      isRequired,
      texts
    );

    const sdkError = errors.byField(identifierType)[0]?.message;

    const fieldLabel =
      identifierType === "email"
        ? locales.form.fields.email.label
        : label;

    const fieldPlaceholder =
      identifierType === "email"
        ? locales.form.fields.email.placeholder
        : label;

    return (
      <FormField
        key={identifierType}
        control={form.control}
        name={identifierType}
        rules={{
          required: isRequired ? locales.form.fields.common.required : false,
          ...(identifierType === "username" && {
            validate: createUsernameValidator(
              isUsernameValid,
              userNameErrors,
              isRequired,
              locales.form.fields.common.required
            ),
          }),
        }}
        render={({ field, fieldState }) => (
          <FormItem>
            <ULThemeStaticLabelField
              {...field}
              label={fieldLabel}
              placeholder={fieldPlaceholder}
              type={type}
              autoComplete={autoComplete}
              error={!!fieldState.error || !!sdkError}
              isRequired={isRequired}
            />
            <ULThemeFormMessage
              sdkError={sdkError}
              hasFormError={!!fieldState.error}
            />
          </FormItem>
        )}
      />
    );
  };

  // Validation for enabling submit button (e.g., email must be valid)
  const isValidEmail = (value: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
  const userEmail = watch("email") ?? "";
  const isEmailValid = isValidEmail(userEmail);

  return (
    <>
      <ULThemeSubtitle>{description}</ULThemeSubtitle>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Contenedor aria-live siempre presente en el DOM.
              - Cuando se añade un error: role="alert" dentro de ULThemeAlert lo anuncia de inmediato.
              - Cuando se hace dismiss: el contenido desaparece de este contenedor y
                aria-live="polite" anuncia el cambio (el área quedó vacía) al narrador. */}
          <div aria-live="polite" aria-atomic="false" className="space-y-5 mb-2">
            {hasError && generalErrors.length > 0 &&
              generalErrors.map((error) => (
                <ULThemeAlert
                  key={error.id}
                  variant="destructive"
                  onDismiss={() => dismiss(error.id)}
                >
                  <ULThemeAlertTitle>{error.message}</ULThemeAlertTitle>
                </ULThemeAlert>
              ))
            }
          </div>
          
          {/* Email field - REQUIRED (label is rendered inside ULThemeStaticLabelField) */}
          {renderIdentifierField('email', true)}


          {/* CAPTCHA Box */}
          {isCaptchaAvailable && captchaConfig && (
            <Captcha
              control={form.control}
              name="captcha"
              captcha={captchaConfig}
              {...captchaProps}
              sdkError={captchaSDKError}
              rules={{
                required: locales.form.fields.captcha.required,
              }}
            />
          )}

          {/* Hidden description for screen readers when the submit button is disabled.
              aria-describedby on the button points here so the narrator announces
              the reason instead of just "botón deshabilitado". */}
          {!isEmailValid && (
            <span id="submit-btn-hint" className="sr-only">
              Ingresa un correo electrónico válido para continuar
            </span>
          )}

          {/* Submit button */}
          <ULThemeButton
            type="submit"
            className="w-full"
            disabled={isSubmitting || !isEmailValid}
            aria-describedby={isEmailValid ? undefined : "submit-btn-hint"}
          >
            {buttonText}
          </ULThemeButton>
        </form>
      </Form>
    </>
  );
}

export default SignupIdForm;
