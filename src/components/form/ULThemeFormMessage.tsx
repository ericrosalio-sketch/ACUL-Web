import { AlertCircle } from "lucide-react";

import { FormMessage, useFormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";

export interface ULThemeFormMessageProps {
  /**
   * SDK error message (takes precedence over form validation errors)
   */
  sdkError?: string;
  /**
   * Whether there is a form validation error
   */
  hasFormError?: boolean;
  /**
   * Whether to show the error icon
   */
  showIcon?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
}

const ULThemeFormMessage = ({
  sdkError,
  hasFormError,
  showIcon = true,
  className,
}: ULThemeFormMessageProps) => {
  // Pull the formMessageId so the SDK-error <p> gets the same id that the
  // input's aria-describedby points to, keeping the association intact
  // regardless of whether the error comes from react-hook-form or the SDK.
  const { formMessageId } = useFormField();

  // Don't render if no errors at all
  if (!sdkError && !hasFormError) {
    return null;
  }

  // Always render with consistent theming and icon for ANY error
  return (
    <div
      className={cn(
        "flex mb-2 items-center text-sm font-medium theme-universal:text-error",
        className
      )}
      role="alert"
    >
      {/* aria-hidden: ícono decorativo, el mensaje de texto ya comunica el error */}
      {showIcon && <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" aria-hidden="true" />}
      {sdkError ? (
        // Use formMessageId so aria-describedby on the input can find this element
        <p id={formMessageId} className="text-destructive text-sm theme-universal:text-error">
          {sdkError}
        </p>
      ) : (
        // FormMessage already renders with id={formMessageId} internally
        <FormMessage className="theme-universal:text-error" />
      )}
    </div>
  );
};

ULThemeFormMessage.displayName = "ULThemeFormMessage";

export { ULThemeFormMessage };
