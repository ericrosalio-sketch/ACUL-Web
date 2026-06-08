import * as React from "react";

import { X } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ULThemeErrorProps extends React.ComponentProps<"div"> {
  variant?: "destructive";
  onDismiss?: () => void;
}

// Inline SVG de iconoAlerta.svg (public/iconos/iconoAlerta.svg)
function IconoAlerta({ className }: { className?: string }) {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 21C16.299 21 21 16.299 21 10.5C21 4.70101 16.299 0 10.5 0C4.70101 0 0 4.70101 0 10.5C0 16.299 4.70101 21 10.5 21ZM10.5 4.6875C11.1213 4.6875 11.625 5.19118 11.625 5.8125V10.6875C11.625 11.3088 11.1213 11.8125 10.5 11.8125C9.87868 11.8125 9.375 11.3088 9.375 10.6875V5.8125C9.375 5.19118 9.87868 4.6875 10.5 4.6875ZM12 14.8125C12 15.641 11.3284 16.3125 10.5 16.3125C9.67158 16.3125 9 15.641 9 14.8125C9 13.9841 9.67158 13.3125 10.5 13.3125C11.3284 13.3125 12 13.9841 12 14.8125Z"
        fill="var(--color-error)"
      />
    </svg>
  );
}

function ULThemeAlert({
  className,
  onDismiss,
  children,
  ...props
}: ULThemeErrorProps) {
  return (
    <div
      role="alert"
      className={cn(
        // Layout
        "flex items-center gap-3",
        // Fondo: --ul-theme-color-widget-background (#FFFFFF)
        "bg-widget-bg",
        // Borde rojo: --ul-theme-color-error (#FF594D)
        "border-2 border-error",
        // Esquinas redondeadas: --ul-theme-border-widget-corner-radius (8px)
        "rounded-widget",
        // Padding
        "px-4 py-3",
        // Sombra sutil
        "shadow-sm",
        // Color de texto: --ul-theme-color-input-filled-text (#081754)
        "text-input-text",
        // Fuente y tamaño usando theme-universal
        "theme-universal:font-body",
        "theme-universal:text-(length:--ul-theme-font-body-text-size)",
        // Posición relativa para el botón dismiss
        onDismiss && "relative pr-10",
        className
      )}
      {...props}
    >
      {/* Ícono de alerta inline */}
      <IconoAlerta className="shrink-0" />

      {/* Contenido del mensaje */}
      <div className="flex-1">{children}</div>

      {/* Botón de cierre opcional */}
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2",
            "opacity-60 hover:opacity-100 transition-opacity",
            "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-error rounded"
          )}
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

function ULThemeAlertTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "font-medium leading-snug",
        "theme-universal:font-body",
        "theme-universal:text-(length:--ul-theme-font-body-text-size)",
        className
      )}
      {...props}
    />
  );
}

export { ULThemeAlert, ULThemeAlertTitle };
export default ULThemeAlert;
