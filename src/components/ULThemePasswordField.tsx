import { useState } from "react";

import {
  ULThemeFloatingLabelField,
  type ULThemeFloatingLabelFieldProps,
} from "@/components/form/ULThemeFloatingLabelField";
import { cn } from "@/lib/utils";

export interface ULThemePasswordFieldProps
  extends Omit<ULThemeFloatingLabelFieldProps, "type" | "endAdornment"> {
  onVisibilityToggle?: (isVisible: boolean) => void;
  buttonClassName?: string;
  showLabel?: string;
  hideLabel?: string;
}

export const ULThemePasswordField = ({
  onVisibilityToggle,
  buttonClassName,
  showLabel = "Mostrar",
  hideLabel = "Ocultar",
  ...props
}: ULThemePasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    const newState = !showPassword;
    setShowPassword(newState);
    onVisibilityToggle?.(newState);
  };

  const passwordButton = (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        // Layout & Positioning
        "cursor-pointer h-full px-3 mr-[-5px]",

        // Border Radius - matches input field
        "theme-universal:rounded-r-input theme-universal:rounded-l-none",

        // Colors - hover: subrayado sin cambio de color (homologado con ULThemeLink)
        "text-link-focus text-(length:--ul-theme-font-links-size) font-(weight:--ul-theme-font-links-weight) focus:rounded-(--ul-theme-border-links-border-radius) hover:underline hover:text-link-focus",

        // Transitions
        "transition-colors",

        // Focus States
        "theme-universal:focus:bg-base-focus/15 focus-visible:outline-none",

        // Layout
        "flex items-center justify-center",

        // Button-like styles
        "bg-transparent border-none outline-none",

        buttonClassName
      )}
      aria-pressed={showPassword}
    >
      {showPassword ? hideLabel : showLabel}
    </button>
  );

  return (
    <ULThemeFloatingLabelField
      {...props}
      type={showPassword ? "text" : "password"}
      endAdornment={passwordButton}
    />
  );
};

ULThemePasswordField.displayName = "ULThemePasswordField";
