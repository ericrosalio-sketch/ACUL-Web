import { useEffect, useRef, useState } from "react";

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
import { ULThemeCheckbox } from "@/components/ULThemeCheckbox";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeLink from "@/components/ULThemeLink";
import { ULThemePasswordField } from "@/components/ULThemePasswordField";
import { ULThemePasswordValidator } from "@/components/ULThemePasswordValidator";
import { useCaptcha } from "@/hooks/useCaptcha";
import { COPPEL_URLS } from "@/constants/coppelConfig";
import { getCanalByClientId } from "@/utils/helpers/canalUtils";
import { pushClicHipervinculo, pushCrearCuentaForm, pushErrorGeneral } from "@/utils/helpers/dataLayerUtils";

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

  // Título de pantalla para eventos de error (según modelo de medición)
  const PAGE_ERROR_TITLE = `${locales.header.title} - Password`;
  const PAGE_ERROR_PATH = "crear-cuenta/crear-password";

  // Rastrear errores ya taggeados para no duplicar eventos en re-renders
  const taggedErrorIds = useRef<Set<string>>(new Set());

  // dataLayer: disparar mensajeErrorGeneral cuando aparecen errores nuevos
  useEffect(() => {
    if (!hasError || generalErrors.length === 0) return;
    generalErrors.forEach((error) => {
      if (!taggedErrorIds.current.has(error.id)) {
        taggedErrorIds.current.add(error.id);
        pushErrorGeneral(
          PAGE_ERROR_TITLE,
          PAGE_ERROR_PATH,
          error.id,
          error.message,
          getCanalByClientId()
        );
      }
    });
  }, [generalErrors, hasError, PAGE_ERROR_TITLE]);

  // Estado de los checkboxes de TyC y Aviso de Privacidad
  const [tycAccepted, setTycAccepted] = useState(false);
  const [privacidadAccepted, setPrivacidadAccepted] = useState(false);

  // El botón solo se habilita cuando la contraseña es válida Y ambos checks están marcados
  const isFormReady = !!passwordValue && isPasswordValid && tycAccepted && privacidadAccepted;

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

        {/* Checkbox — Términos y Condiciones
            Patrón accesible: htmlFor + id en vez de wrappear en <label>.
            Razón: si el checkbox está DENTRO de <label>, clicar el enlace también
            activa el checkbox (bug de usabilidad). Con htmlFor el enlace funciona
            de forma independiente y el narrador asocia correctamente el texto al checkbox.
            El texto del enlace incluye "(abre en nueva ventana)" visible solo para
            el narrador (sr-only) porque el enlace usa target="_blank". */}
        <div className="flex items-start gap-3 mb-3 mt-2">
          <ULThemeCheckbox
            id="checkbox-tyc"
            checked={tycAccepted}
            onCheckedChange={(checked) => setTycAccepted(checked === true)}
          />
          <label
            htmlFor="checkbox-tyc"
            className="text-sm text-body-text leading-relaxed cursor-pointer"
          >
            {locales.checkboxes.tyc.prefix}
            <a
              href={COPPEL_URLS.tycUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link-focus underline"
              onClick={(e) => {
                e.stopPropagation();
                // dataLayer: evento clicClienteDigital al seleccionar el hipervínculo de TyC
                pushClicHipervinculo(
                  locales.checkboxes.tyc.linkText,
                  "/crear-cuenta/crear-password",
                  getCanalByClientId()
                );
              }}
            >
              {locales.checkboxes.tyc.linkText}
              <span className="sr-only"> (abre en nueva ventana)</span>
            </a>
          </label>
        </div>

        {/* Checkbox — Aviso de Privacidad */}
        <div className="flex items-start gap-3 mb-4">
          <ULThemeCheckbox
            id="checkbox-privacidad"
            checked={privacidadAccepted}
            onCheckedChange={(checked) => setPrivacidadAccepted(checked === true)}
          />
          <label
            htmlFor="checkbox-privacidad"
            className="text-sm text-body-text leading-relaxed cursor-pointer"
          >
            {locales.checkboxes.privacidad.prefix}
            <a
              href={COPPEL_URLS.privacidadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link-focus underline"
              onClick={(e) => {
                e.stopPropagation();
                // dataLayer: evento clicClienteDigital al seleccionar el hipervínculo de Privacidad
                pushClicHipervinculo(
                  locales.checkboxes.privacidad.linkText,
                  "/crear-cuenta/crear-password",
                  getCanalByClientId()
                );
              }}
            >
              {locales.checkboxes.privacidad.linkText}
              <span className="sr-only"> (abre en nueva ventana)</span>
            </a>
          </label>
        </div>

        {/* Descripción oculta para lectores de pantalla: explica por qué el botón está deshabilitado. */}
        {!isFormReady && (
          <span id="password-requirements-hint" className="sr-only">
            El botón estará habilitado cuando la contraseña cumpla con todos los requisitos de seguridad y hayas aceptado los Términos y Condiciones y el Aviso de Privacidad.
          </span>
        )}

        {/* Submit button — deshabilitado si la contraseña no es válida o algún checkbox no está marcado. */}
        <ULThemeButton
          type="submit"
          className="w-full"
          disabled={isSubmitting || !isFormReady}
          aria-describedby={!isFormReady ? "password-requirements-hint" : undefined}
        >
          {buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default SignupPasswordForm;
