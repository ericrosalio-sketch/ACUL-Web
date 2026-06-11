import { useForm } from "react-hook-form";

import {
  useErrors,
  usePasswordValidation,
} from "@auth0/auth0-acul-react/signup-password";
import type {
  ErrorItem,
  PasswordValidationResult,
  SignupPasswordOptions,
} from "@auth0/auth0-acul-react/types";

import Captcha from "@/components/Captcha/index";
import { ULThemeFloatingLabelField } from "@/components/form/ULThemeFloatingLabelField";
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeLink from "@/components/ULThemeLink";
import { ULThemePasswordField } from "@/components/ULThemePasswordField";
import { ULThemePasswordValidator } from "@/components/ULThemePasswordValidator";
import { useCaptcha } from "@/hooks/useCaptcha";
import { getCanalByClientId } from "@/utils/helpers/canalUtils";
import { pushCrearCuentaForm } from "@/utils/helpers/dataLayerUtils";

import { useSignupPasswordManager } from "../hooks/useSignupPasswordManager";

function SignupPasswordForm() {
  const {
    handleSignupPassword,
    isCaptchaAvailable,
    signupPassword,
    texts,
    captcha,
    editLink,
    locales,
  } = useSignupPasswordManager();

  const { errors, hasError, dismiss } = useErrors();

  const form = useForm<SignupPasswordOptions>({
    defaultValues: {
      email: "",
      username: "",
      phoneNumber: "",
      password: "",
      captcha: "",
    },
    reValidateMode: "onBlur",
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  // Get password validation rules from Auth0 SDK
  const passwordValue = watch("password");
  const {
    isValid: isPasswordValid,
    results: passwordResults,
  }: PasswordValidationResult = usePasswordValidation(passwordValue);

  // Get user data from screen data for readonly fields
  const screenData = signupPassword?.screen?.data;
  const userEmail = screenData?.email;
  const userPhone = screenData?.phoneNumber;
  const userUsername = screenData?.username;

  // Edit link for readonly fields — uses ULThemeLink like Login-password
  const editButton = (
    <ULThemeLink href={editLink || ""}>
      {locales.form.fields.email.editButton}
    </ULThemeLink>
  );

  // Use locale strings with fallback to SDK texts
  const buttonText = locales.form.button || texts?.buttonText;
  const captchaLabel = texts?.captchaCodePlaceholder
    ? `${texts.captchaCodePlaceholder}*`
    : `${locales.form.fields.captcha.label}*`;
  const passwordLabel = texts?.passwordPlaceholder
    ? `${texts.passwordPlaceholder}`
    : `${locales.form.fields.password.label}`;
  const passwordSecurityText =
    locales.form.passwordSecurity || texts?.passwordSecurityText || "Tu contraseña debe tener:";
  const emailLabel = locales.form.fields.email.label || texts?.emailPlaceholder || "";
  const phoneLabel = locales.form.fields.phone.label || texts?.phonePlaceholder || "";
  const usernameLabel =
    locales.form.fields.username.label || texts?.usernamePlaceholder || "";

  // Setup captcha with useCaptcha hook
  const { captchaConfig, captchaProps } = useCaptcha(
    captcha || undefined,
    captchaLabel
  );

  // Get general errors (not field-specific) and errors for hidden fields
  const visibleFields = ["password", "captcha"];
  if (userEmail) visibleFields.push("email");
  if (userPhone) visibleFields.push("phone", "phone_number");
  if (userUsername) visibleFields.push("username");

  const generalErrors: ErrorItem[] = errors.byType("auth0").filter((error) => {
    // Include errors with no field or null field
    if (!error.field || error.field === null) return true;

    // Include field errors for non-visible fields
    return !visibleFields.includes(error.field);
  });

  // Get field-specific errors
  const passwordError = errors.byField("password")[0]?.message;
  const captchaSDKError = errors.byField("captcha")[0]?.message;

  // Simplified submit handler
  const onSubmit = async (data: SignupPasswordOptions) => {
    // dataLayer: evento crearCuenta al dar click en Continuar en pantalla de contraseña
    const cuentaTipo = userPhone ? "Celular" : "Correo";
    pushCrearCuentaForm("Continuar", "/crear-cuenta", cuentaTipo, getCanalByClientId());

    const submitData: SignupPasswordOptions = {
      ...data,
      email: userEmail,
      username: userUsername,
      phoneNumber: userPhone,
    };
    await handleSignupPassword(submitData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} aria-label="Crear cuenta">
        {/* Contenedor aria-live siempre presente en el DOM.
            - Errores nuevos: role="alert" de ULThemeAlert los anuncia de inmediato.
            - Dismiss: el contenido desaparece y aria-live="polite" confirma el cambio. */}
        <div aria-live="polite" aria-atomic="false" className="space-y-3 mb-4">
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

        {/* Readonly email field.
            aria-readonly + aria-describedby informan al narrador que el campo
            no es editable aquí y que puede usar el enlace "Editar" para cambiarlo. */}
        {userEmail && (
          <>
            <span id="readonly-email-hint" className="sr-only">
              Campo de solo lectura. Usa el enlace Editar para modificarlo.
            </span>
            <ULThemeFloatingLabelField
              id="signup-email-field"
              label={emailLabel}
              type="email"
              value={userEmail}
              readOnly
              aria-readonly="true"
              aria-describedby="readonly-email-hint"
              endAdornment={editButton}
            />
          </>
        )}

        {/* Readonly phone field */}
        {userPhone && (
          <>
            <span id="readonly-phone-hint" className="sr-only">
              Campo de solo lectura. Usa el enlace Editar para modificarlo.
            </span>
            <ULThemeFloatingLabelField
              id="signup-phone-field"
              label={phoneLabel}
              type="tel"
              value={userPhone}
              readOnly
              disabled
              aria-readonly="true"
              aria-describedby="readonly-phone-hint"
              endAdornment={editButton}
            />
          </>
        )}

        {/* Readonly username field */}
        {userUsername && (
          <>
            <span id="readonly-username-hint" className="sr-only">
              Campo de solo lectura. Usa el enlace Editar para modificarlo.
            </span>
            <ULThemeFloatingLabelField
              id="signup-username-field"
              label={usernameLabel}
              type="text"
              value={userUsername}
              readOnly
              disabled
              aria-readonly="true"
              aria-describedby="readonly-username-hint"
              endAdornment={editButton}
            />
          </>
        )}

        {/* Password field */}
        <FormField
          control={form.control}
          name="password"
          rules={{
            required: locales.form.fields.password.required,
            validate: (value) => {
              if (!value) return locales.form.fields.password.required;
              if (!isPasswordValid)
                return locales.form.fields.password.doesNotMeetRequirements;
              return true;
            },
          }}
          render={({ field, fieldState }) => (
            <FormItem>
              <ULThemePasswordField
                {...field}
                label={passwordLabel}
                error={!!fieldState.error || !!passwordError}
                autoFocus={true}
                showLabel={locales.form.fields.password.showLabel}
                hideLabel={locales.form.fields.password.hideLabel}
              />
              <ULThemeFormMessage
                sdkError={passwordError}
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
              required: locales.form.fields.captcha.required,
            }}
          />
        )}

        {/* Password Validation Rules - siempre visible como en el template de Coppel */}
        <ULThemePasswordValidator
          validationRules={passwordResults}
          passwordSecurityText={passwordSecurityText}
          show={true}
          className="mb-4"
        />

        {/* Descripción oculta para lectores de pantalla: explica por qué el botón está deshabilitado.
            Solo se monta en el DOM cuando la contraseña no es válida o está vacía,
            siguiendo el mismo patrón que SignupIdForm. */}
        {(!isPasswordValid || !passwordValue) && (
          <span id="password-requirements-hint" className="sr-only">
            El botón estará habilitado cuando la contraseña cumpla con todos los requisitos de seguridad.
          </span>
        )}

        {/* Submit button — deshabilitado si la contraseña está vacía o no cumple los requisitos.
            Mismo patrón que SignupIdForm: solo atributo disabled nativo + aria-describedby
            que apunta a la pista accesible cuando el botón no está disponible. */}
        <ULThemeButton
          type="submit"
          className="w-full"
          disabled={isSubmitting || !passwordValue || !isPasswordValid}
          aria-describedby={(!passwordValue || !isPasswordValid) ? "password-requirements-hint" : undefined}
        >
          {buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default SignupPasswordForm;
