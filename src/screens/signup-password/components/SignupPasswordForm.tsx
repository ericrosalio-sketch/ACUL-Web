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
import { ULThemeFormMessage } from "@/components/form/ULThemeFormMessage";
import { ULThemeStaticLabelField } from "@/components/form/ULThemeStaticLabelField";
import { ULThemeStaticPasswordField } from "@/components/form/ULThemeStaticPasswordField";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { ULThemeButton } from "@/components/ULThemeButton";
// Los siguientes imports solo se usan cuando SHOW_SIGNUP_CHECKBOXES = true
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ULThemeCheckbox } from "@/components/ULThemeCheckbox";
import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeLink from "@/components/ULThemeLink";
import { ULThemePasswordValidator } from "@/components/ULThemePasswordValidator";
import { useCaptcha } from "@/hooks/useCaptcha";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { COPPEL_URLS } from "@/constants/coppelConfig";
import { getCanalByClientId } from "@/utils/helpers/canalUtils";
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pushClicHipervinculo,
  pushCrearCuentaForm,
  pushErrorGeneral,
} from "@/utils/helpers/dataLayerUtils";

import { useSignupPasswordManager } from "../hooks/useSignupPasswordManager";

/**
 * Feature flag — controla si los checkboxes de Términos y Condiciones y
 * Aviso de Privacidad se muestran en el formulario.
 *
 *  true  → los checkboxes se renderizan y AMBOS deben estar marcados para
 *           que el botón "Crear cuenta" quede habilitado.
 *  false → los checkboxes NO se renderizan y el botón solo depende de que
 *           la contraseña cumpla los requisitos de seguridad.
 */
const SHOW_SIGNUP_CHECKBOXES = false;

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

  // Edit links for readonly fields — each has a distinct aria-label so the
  // narrator announces "Editar correo electrónico", "Editar celular", etc.
  // instead of plain "Editar" repeated three times.
  const editEmailButton = (
    <ULThemeLink
      href={editLink || ""}
      aria-label={`${locales.form.fields.email.editButton} ${emailLabel}`}
      >
      {locales.form.fields.email.editButton}
    </ULThemeLink>
  );
  const editPhoneButton = (
    <ULThemeLink
      href={editLink || ""}
      aria-label={`${locales.form.fields.phone.editButton} ${phoneLabel}`}
    >
      {locales.form.fields.phone.editButton}
    </ULThemeLink>
  );
  const editUsernameButton = (
    <ULThemeLink
      href={editLink || ""}
      aria-label={`${locales.form.fields.username.editButton} ${usernameLabel}`}
    >
      {locales.form.fields.username.editButton}
    </ULThemeLink>
  );

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

  // El botón se habilita cuando la contraseña es válida y, si SHOW_SIGNUP_CHECKBOXES
  // está activo, también cuando ambos checkboxes están marcados.
  const checkboxesReady = SHOW_SIGNUP_CHECKBOXES ? tycAccepted && privacidadAccepted : true;
  const isFormReady = !!passwordValue && isPasswordValid && checkboxesReady;

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

        {/* Campos de solo lectura (correo / celular / nombre de usuario).
            El <div role="group" aria-label="Correo electrónico: user@email.com"> provee
            el anuncio limpio al narrador: "[campo]: [valor]".
            wrapperAriaHidden={true} oculta el <label> y el <input> al árbol AT para
            evitar redundancias — el único anuncio viene del aria-label del grupo padre.
            El enlace "Editar [campo]" sigue siendo accesible con su aria-label descriptivo. */}
        {userEmail && (
          <div
            aria-hidden={true}
            className="relative w-full mb-2"
          >
            <ULThemeStaticLabelField
              label={emailLabel}
              type="email"
              value={userEmail}
              readOnly
              wrapperAriaHidden={true}
              className="pr-20"
              aria-hidden={true}
            />
            <div className="absolute right-3 bottom-2 h-14 flex items-center">
              {editEmailButton}
            </div>
          </div>
        )}

        {userPhone && (
          <div
            aria-hidden={true}
            className="relative w-full mb-2"
          >
            <ULThemeStaticLabelField
              label={phoneLabel}
              type="tel"
              value={userPhone}
              readOnly
              disabled
              wrapperAriaHidden={true}
              className="pr-20"
            />
            <div className="absolute right-3 bottom-2 h-14 flex items-center">
              {editPhoneButton}
            </div>
          </div>
        )}

        {userUsername && (
          <div
            aria-hidden={true}
            className="relative w-full mb-2"
          >
            <ULThemeStaticLabelField
              label={usernameLabel}
              type="text"
              value={userUsername}
              readOnly
              disabled
              wrapperAriaHidden={true}
              className="pr-20"
            />
            <div className="absolute right-3 bottom-2 h-14 flex items-center">
              {editUsernameButton}
            </div>
          </div>
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
              {/* visualPlaceholder en lugar de placeholder:
                  el texto de hint se renderiza como <span aria-hidden="true">
                  dentro del campo, por lo que el narrador NO lo anuncia.
                  El <input> queda con placeholder="" (vacío), evitando el anuncio
                  "Contraseña, edición, escribe una contraseña, en blanco".
                  El hint sigue siendo visible visualmente según el diseño de UX. */}
              <ULThemeStaticPasswordField
                {...field}
                label={passwordLabel}
                visualPlaceholder={locales.form.fields.password.placeholder}
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

        {/* Password Validation Rules - siempre visible como en el template de Coppel.
            passwordValue permite al validador anunciar todos los requisitos cuando el
            campo está vacío, y solo los pendientes cuando el usuario ya escribió algo. */}
        <ULThemePasswordValidator
          validationRules={passwordResults}
          passwordSecurityText={passwordSecurityText}
          passwordValue={passwordValue}
          show={true}
          className="mb-4"
        />

        {/* Checkboxes — Términos y Condiciones + Aviso de Privacidad.
            Solo se renderizan cuando SHOW_SIGNUP_CHECKBOXES = true. */}
        {SHOW_SIGNUP_CHECKBOXES && (
          <>
            {/* Patrón accesible: htmlFor + id en vez de wrappear en <label>.
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
                <ULThemeLink
                  href={COPPEL_URLS.tycUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold"
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
                </ULThemeLink>
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
                <ULThemeLink
                  href={COPPEL_URLS.privacidadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold"
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
                </ULThemeLink>
              </label>
            </div>
          </>
        )}

        {/* Descripción siempre en el DOM para lectores de pantalla.
            aria-live="polite" + aria-atomic="true": el narrador anuncia el mensaje
            cuando cambia (botón se habilita/deshabilita) sin interrumpir al usuario.
            Mantenerlo siempre en el DOM evita que el narrador pierda el contexto
            del aria-describedby cuando isFormReady cambia a true. */}
        <span
          id="password-requirements-hint"
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          {!isFormReady
            ? SHOW_SIGNUP_CHECKBOXES
              ? "El botón estará habilitado cuando la contraseña cumpla con todos los requisitos de seguridad y hayas aceptado los Términos y Condiciones y el Aviso de Privacidad."
              : "El botón estará habilitado cuando la contraseña cumpla con todos los requisitos de seguridad."
            : ""}
        </span>

        {/* Submit button — deshabilitado si la contraseña no es válida. */}
        <ULThemeButton
          type="submit"
          className="w-full"
          disabled={isSubmitting || !isFormReady}
          aria-describedby="password-requirements-hint"
        >
          {buttonText}
        </ULThemeButton>
      </form>
    </Form>
  );
}

export default SignupPasswordForm;
