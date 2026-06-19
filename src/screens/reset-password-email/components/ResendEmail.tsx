import type { ErrorItem } from "@auth0/auth0-acul-react/types";

import { ULThemeAlert, ULThemeAlertTitle } from "@/components/ULThemeError";
import ULThemeLink from "@/components/ULThemeLink";

import { useResetPasswordEmailManager } from "../hooks/useResetPasswordEmailManager";

function ResendEmail() {
  // Extracting attributes from hook made out of ResetPasswordEmailInstance class of Auth0 React SDK
  const { texts, handleResendEmail, useErrors, locales } =
    useResetPasswordEmailManager();
  const { errors, hasError, dismiss } = useErrors;
  const buttonText = texts?.resendLinkText || locales.button.resendText;
  const notReceivedText =
    locales.footer?.notReceived || "¿No recibiste el correo de activación?";

  // Extract general errors (not field-specific) from the SDK
  const generalErrors: ErrorItem[] =
    errors.byType("auth0")?.filter((error) => {
      return !error.field || error.field === null;
    }) || [];

  return (
    <>
      {/* General error messages */}
      {hasError && generalErrors.length > 0 && (
        <div className="space-y-3 mb-4">
          {generalErrors.map((error) => (
            <ULThemeAlert
              key={error.id}
              variant="destructive"
              onDismiss={() => dismiss(error.id)}
            >
              <ULThemeAlertTitle>{error.message}</ULThemeAlertTitle>
            </ULThemeAlert>
          ))}
        </div>
      )}
      <div className="text-center mt-0 flex flex-col items-center gap-0">
        <span
          style={{
            color: "var(--Colores-Text-text, #081754)",
            textAlign: "center",
            fontFamily: "var(--family-title, Poppins)",
            fontSize: "var(--size-Small, 14px)",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "150%",
          }}
        >
          {notReceivedText}
        </span>
        <ULThemeLink
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleResendEmail();
          }}
        >
          {buttonText}
        </ULThemeLink>
      </div>
    </>
  );
}
export default ResendEmail;
