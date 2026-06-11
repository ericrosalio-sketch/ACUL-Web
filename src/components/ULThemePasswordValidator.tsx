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
  show = true,
}: ULThemePasswordValidatorProps) => {
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

      {/* aria-live="polite": cuando el usuario escribe y cambia el estado de una regla,
          el narrador anuncia el cambio sin interrumpir la escritura.
          aria-atomic="false": anuncia solo el <li> que cambió, no toda la lista. */}
      <ul className="space-y-2" aria-live="polite" aria-atomic="false" aria-label={passwordSecurityText}>
        {validationRules.map((rule) => renderValidationItem(rule))}
      </ul>
    </div>
  );
};

ULThemePasswordValidator.displayName = "ULThemePasswordValidator";
