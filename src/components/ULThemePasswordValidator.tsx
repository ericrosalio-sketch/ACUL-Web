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

const CheckIcon = () => (
  <img
    src="/iconos/CheckIcon.svg"
    width="20"
    height="20"
    className="inline-block mr-2 flex-shrink-0"
    alt="check"
  />
);

const BulletIcon = () => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block mr-2 flex-shrink-0"
    style={{ color: "#717171" }}
  >
    <circle cx="4" cy="4" r="3" fill="currentColor" />
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

    return (
      <li
        key={rule.code}
        className={cn(
          "text-(length:--ul-theme-font-body-text-size) flex items-start list-none",
          "text-(color:--ul-theme-color-secondary-button-label)"
        )}
      >
        <span className="flex items-center mt-0.5">
          {rule.isValid ? <CheckIcon /> : <BulletIcon />}
        </span>
        <div>
          <span>{rule.label}</span>
          {/* Render nested items if they exist */}
          {hasNestedItems && (
            <ul className="mt-1 space-y-1 pl-4">
              {rule.items!.map((item) => (
                <li
                  key={item.code}
                  className={cn(
                    "text-(length:--ul-theme-font-body-text-size) flex items-start list-none",
                    "text-(color:--ul-theme-color-secondary-button-label)"
                  )}
                >
                  <span className="flex items-center mt-0.5">
                    {item.isValid ? <CheckIcon /> : <BulletIcon />}
                  </span>
                  {item.label}
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
      <div className="text-(length:--ul-theme-font-body-text-size) text-(color:--ul-theme-color-secondary-button-label) text-body-text mb-3 font-medium">
        {passwordSecurityText}
      </div>

      <ul className="space-y-2">
        {validationRules.map((rule) => renderValidationItem(rule))}
      </ul>
    </div>
  );
};

ULThemePasswordValidator.displayName = "ULThemePasswordValidator";
