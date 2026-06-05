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
}

export const ULThemePasswordField = ({
  onVisibilityToggle,
  buttonClassName,
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

        // Colors - texto azul Coppel como en el template
        "text-[#1C42E8] hover:text-[#1C42E8]/80",
        "text-sm font-medium",

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
      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
    >
      {showPassword ? "Ocultar" : "Mostrar"}
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
