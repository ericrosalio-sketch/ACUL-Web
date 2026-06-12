import { useState } from "react";

import {
  ULThemeStaticLabelField,
  type ULThemeStaticLabelFieldProps,
} from "@/components/form/ULThemeStaticLabelField";
import { cn } from "@/lib/utils";

export interface ULThemeStaticPasswordFieldProps
  extends Omit<ULThemeStaticLabelFieldProps, "type"> {
  onVisibilityToggle?: (isVisible: boolean) => void;
  buttonClassName?: string;
  showLabel?: string;
  hideLabel?: string;
}

/**
 * A password field with a **static label** placed above the input (no floating
 * effect) and a show/hide visibility toggle button.  It combines the behaviour
 * of `ULThemePasswordField` with the static-label layout of
 * `ULThemeStaticLabelField`.
 */
export const ULThemeStaticPasswordField = ({
  onVisibilityToggle,
  buttonClassName,
  showLabel = "Mostrar",
  hideLabel = "Ocultar",
  className,
  ...props
}: ULThemeStaticPasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    const newState = !showPassword;
    setShowPassword(newState);
    onVisibilityToggle?.(newState);
  };

  return (
    <div className="relative w-full">
      <ULThemeStaticLabelField
        {...props}
        type={showPassword ? "text" : "password"}
        className={cn(
          // Extra right padding so the text does not overlap the toggle button
          "pr-24",
          className
        )}
      />

      {/* Toggle button – absolutely positioned inside the input area.
          bottom-2 accounts for the mb-2 on the input so the button sits flush
          with the input bottom edge; h-14 + flex items-center then centres it
          vertically within the input. */}
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          // Positioning – sit at the bottom of the input (offset by input's mb-2)
          "absolute right-0 bottom-2",
          // Match the input height (h-14 = 3.5rem)
          "h-14",

          // Layout & Spacing – no negative margin since the button is absolutely
          // positioned outside the input's own DOM; just use px-3 for inner padding
          "cursor-pointer px-3 theme-universal:rounded-r-input theme-universal:rounded-l-none",

          // Colors - hover: subrayado sin cambio de color (homologado con ULThemeLink)
          "text-link-focus text-(length:--ul-theme-font-links-size) font-(weight:--ul-theme-font-links-weight) focus:rounded-(--ul-theme-border-links-border-radius) hover:underline hover:text-link-focus",

          // Transitions
          "transition-colors",

          // Focus States
          "theme-universal:focus:bg-base-focus/15 focus-visible:outline-none",

          // Layout
          "flex items-center justify-center",

          // Button reset
          "bg-transparent border-none outline-none",

          buttonClassName
        )}
        aria-pressed={showPassword}
      >
        {/* aria-pressed comunica el estado toggle al narrador.
            No se usa aria-label porque el texto visible ("Mostrar"/"Ocultar")
            ya es el nombre accesible correcto en español — no se duplica. */}
        {showPassword ? hideLabel : showLabel}
      </button>
    </div>
  );
};

ULThemeStaticPasswordField.displayName = "ULThemeStaticPasswordField";
