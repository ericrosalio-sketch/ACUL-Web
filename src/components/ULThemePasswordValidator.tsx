import { useMemo } from "react";

import type { PasswordComplexityRule } from "@auth0/auth0-acul-react/types";

import { cn } from "@/lib/utils";

export interface ULThemePasswordValidatorProps {
  /**
   * Array of password validation rules from usePasswordValidation hook
   */
  validationRules: PasswordComplexityRule[];
  /**
   * Optional class names for additional styling
   */
  className?: string;
  /**
   * Whether to show the validation box
   */
  show?: boolean;
  passwordSecurityText?: string;
  /**
   * Valor actual del campo de contraseña.
   * - Vacío ("" o undefined): anuncia TODOS los requisitos (el usuario aún no sabe qué se pide).
   * - Con valor: anuncia solo los requisitos PENDIENTES (los cumplidos ya son implícitos).
   * Esto cumple WCAG 3.3.2 (instrucciones) y 4.1.3 (mensajes de estado).
   */
  passwordValue?: string;
}

// aria-hidden: estos íconos son decorativos — el estado se comunica via aria-label del <li>
const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block mr-2 flex-shrink-0"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 20C15.5229 20 20 15.5229 20 10C20 4.47716 15.5229 0 10 0C4.47716 0 0 4.47716 0 10C0 15.5229 4.47716 20 10 20ZM15.004 7.45503C15.3736 6.99296 15.2987 6.31873 14.8366 5.94907C14.3746 5.57941 13.7003 5.65433 13.3307 6.1164L8.2651 12.4483L6.23873 10.9286C5.76534 10.5735 5.09377 10.6695 4.73873 11.1429C4.3837 11.6162 4.47963 12.2878 4.95301 12.6429L7.81016 14.7857C8.27313 15.133 8.92816 15.0497 9.28967 14.5979L15.004 7.45503Z"
      fill="#0ABF4F"
    />
  </svg>
);

const BulletIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block mr-2 flex-shrink-0"
    style={{ color: "#717171" }}
    aria-hidden="true"
  >
    <circle cx="10" cy="10" r="3" fill="currentColor" />
  </svg>
);

export const ULThemePasswordValidator = ({
  validationRules,
  className,
  passwordSecurityText,
  passwordValue,
  show = true,
}: ULThemePasswordValidatorProps) => {
  // useMemo ANTES del early return para cumplir las reglas de hooks de React.
  //
  // Estrategia de anuncio según WCAG 3.3.2 y 4.1.3:
  // - Campo vacío: anuncia TODOS los requisitos sin decir si están cumplidos o no,
  //   ya que se infiere que ninguno se ha cumplido aún (el usuario no ha escrito nada).
  // - Campo con valor: anuncia solo los requisitos PENDIENTES. Los cumplidos son
  //   implícitos — anunciarlos genera ruido auditivo innecesario.
  // - Todos cumplidos: anuncia mensaje de éxito.
  const liveAnnouncement = useMemo(() => {
    if (!validationRules || validationRules.length === 0) return "";

    // Recolecta labels de las reglas, considerando subitems
    const collectLabels = (
      rules: PasswordComplexityRule[],
      onlyPending: boolean
    ): string[] => {
      const labels: string[] = [];
      for (const r of rules) {
        if (r.items && r.items.length > 0) {
          // Grupo con subitems: anuncia el label del grupo + los subitems relevantes
          const subLabels = collectLabels(r.items, onlyPending);
          if (subLabels.length > 0) {
            labels.push(r.label, ...subLabels);
          }
        } else {
          if (!onlyPending || !r.isValid) {
            labels.push(r.label);
          }
        }
      }
      return labels;
    };

    const isEmpty = !passwordValue || passwordValue === "";

    if (isEmpty) {
      // Campo vacío: anuncia todos los requisitos sin estado
      const allLabels = collectLabels(validationRules, false);
      if (allLabels.length === 0) return "";
      return `Tu contraseña debe tener: ${allLabels.join(", ")}.`;
    }

    // Campo con valor: solo los pendientes
    const pendingLabels = collectLabels(validationRules, true);
    if (pendingLabels.length === 0) {
      return "Todos los requisitos de contraseña cumplidos.";
    }
    return `Requisitos pendientes: ${pendingLabels.join(", ")}.`;
  }, [validationRules, passwordValue]);

  if (!show || !validationRules || validationRules.length === 0) {
    return null;
  }

  const renderValidationItem = (rule: PasswordComplexityRule) => {
    const hasNestedItems = rule.items && rule.items.length > 0;
    // aria-label comunica visualmente el texto + estado al narrador,
    // ya que el ícono (CheckIcon/BulletIcon) está marcado como aria-hidden.
    const ruleStatus = rule.isValid ? "cumplido" : "pendiente";

    return (
      <li
        key={rule.code}
        aria-label={`${rule.label}: ${ruleStatus}`}
        className={cn(
          "text-(length:--ul-theme-font-body-text-size) flex items-start list-none",
          "text-(--coppel-color-text-dark)"
        )}
      >
        <span className="flex items-center mt-0.5" aria-hidden="true">
          {rule.isValid ? <CheckIcon /> : <BulletIcon />}
        </span>
        <div>
          <span aria-hidden="true">{rule.label}</span>
          {/* Render nested items if they exist */}
          {hasNestedItems && (
            <ul className="mt-1 space-y-1 pl-4">
              {rule.items!.map((item) => (
                <li
                  key={item.code}
                  aria-label={`${item.label}: ${item.isValid ? "cumplido" : "pendiente"}`}
                  className={cn(
                    "text-(length:--ul-theme-font-body-text-size) flex items-start list-none",
                    "text-(--coppel-color-text-dark)"
                  )}
                >
                  <span className="flex items-center mt-0.5" aria-hidden="true">
                    {item.isValid ? <CheckIcon /> : <BulletIcon />}
                  </span>
                  <span aria-hidden="true">{item.label}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </li>
    );
  };

  return (
    <div
      className={cn(
        "bg-widget-bg border border-input rounded-input p-4 mb-4",
        className
      )}
    >
      <div className="text-(length:--ul-theme-font-body-text-size) text-(--coppel-color-text-dark) mb-3 font-medium max-w-[310px] max-h-21 overflow-auto">
        {passwordSecurityText}
      </div>

      {/* Anuncio sr-only con aria-live="polite": anuncia un resumen del estado cuando
          cambia (ej: "2 de 4 requisitos cumplidos") sin interferir con el orden de
          lectura secuencial del DOM. El aria-live NO va en el <ul> porque causaría
          que el narrador lea los items anidados antes que los de primer nivel. */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveAnnouncement}
      </div>

      {/* La lista NO tiene aria-live — el narrador la lee en orden secuencial del DOM
          cuando el usuario navega con Tab/flechas. */}
      <ul className="space-y-2" aria-label={passwordSecurityText}>
        {validationRules.map((rule) => renderValidationItem(rule))}
      </ul>
    </div>
  );
};

ULThemePasswordValidator.displayName = "ULThemePasswordValidator";
