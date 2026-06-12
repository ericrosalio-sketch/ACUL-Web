import { useState } from "react";
import type React from "react";

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
  /**
   * Cuando se pasa, el atributo HTML `placeholder` del `<input>` queda vacío
   * y el texto se muestra en su lugar mediante un `<span aria-hidden="true">`
   * posicionado absolutamente dentro del campo.
   *
   * Esto evita que el narrador anuncie el placeholder como parte del nombre
   * accesible del campo (ej: "Contraseña, edición, escribe una contraseña,
   * en blanco"), ya que el `<span>` es invisible para las tecnologías asistivas.
   * El hint sigue siendo **visible visualmente** según el diseño de UX.
   */
  visualPlaceholder?: string;
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
  visualPlaceholder,
  value,
  className,
  ...props
}: ULThemeStaticPasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    const newState = !showPassword;
    setShowPassword(newState);
    onVisibilityToggle?.(newState);
  };

  // Cuando se usa visualPlaceholder, el <input> no tiene placeholder HTML
  // para que el narrador no lo anuncie. El hint visual lo provee el <span>.
  const hasValue = value !== undefined && value !== "";

  // Siempre usamos type="text" para evitar que el narrador anuncie "contraseña"
  // como parte del rol del input (lo que causaba "Contraseña, edición, contraseña,
  // en blanco"). Cuando la contraseña está oculta, -webkit-text-security:disc
  // muestra los bullets visualmente sin cambiar el tipo semántico del input.
  // Cuando está visible, se remueve esa propiedad CSS y el texto se muestra normal.
  const textSecurityStyle: React.CSSProperties = !showPassword
    ? ({
        WebkitTextSecurity: "disc",
        // Firefox no soporta -webkit-text-security, pero tampoco añade "contraseña"
        // al anuncio del rol, así que el problema solo existe en Chromium/Safari.
      } as React.CSSProperties)
    : {};

  return (
    <div className="relative w-full">
      <ULThemeStaticLabelField
        {...props}
        value={value}
        // Siempre type="text" — la apariencia de password se logra via CSS
        type="text"
        // Si hay visualPlaceholder, se omite el placeholder HTML del input
        placeholder={visualPlaceholder ? "" : props.placeholder}
        style={textSecurityStyle}
        className={cn(
          // Extra right padding so the text does not overlap the toggle button
          "pr-24",
          className
        )}
      />

      {/* Placeholder visual decorativo: aria-hidden="true" para que el narrador
          NO lo anuncie. Se muestra solo cuando el campo está vacío.
          left-3 y px-3 corresponden al padding-left del input (px-3 = 0.75rem).
          bottom-2 = offset del mb-2 del input; h-14 = altura del input. */}
      {visualPlaceholder && !hasValue && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-3 pointer-events-none select-none",
            "bottom-2 h-14 flex items-center",
            // Estilos que imitan el placeholder CSS nativo del input
            "theme-universal:text-input-labels",
            "theme-universal:text-(length:--ul-theme-font-input-labels-size)",
            "theme-universal:font-input-label",
          )}
        >
          {visualPlaceholder}
        </span>
      )}

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
