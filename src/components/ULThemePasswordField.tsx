import { useFormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useState } from "react";

const ulThemeStaticLabelVariants =
  "block mb-1 theme-universal:text-(length:--ul-theme-font-input-labels-size) theme-universal:font-input-label text-[#081754]";

const ulThemeStaticInputVariants =
  "w-full h-[45px] rounded-[8px] px-3 py-2 outline-none bg-white border border-[#C9C9C9] transition-[color,box-shadow] duration-150 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:opacity-50 autofill:bg-transparent autofill:[-webkit-text-fill-color:inherit] autofill:[transition:background-color_9999s_ease-in-out_0s] mb-2 theme-universal:bg-input-bg theme-universal:text-input-text theme-universal:border-(length:--ul-theme-border-input-border-weight) theme-universal:border-input-border theme-universal:rounded-input theme-universal:text-(length:--ul-theme-font-body-text-size) theme-universal:font-body-text theme-universal:placeholder:text-input-labels theme-universal:placeholder:text-(length:--ul-theme-font-input-labels-size) theme-universal:placeholder:font-input-label theme-universal:focus:border-base-focus theme-universal:focus:ring-1 theme-universal:focus:ring-base-focus";

export interface ULThemePasswordFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  error?: boolean;
  wrapperClassName?: string;
  onVisibilityToggle?: (isVisible: boolean) => void;
  buttonClassName?: string;
  showLabel?: string;
  hideLabel?: string;
  labelClassName?: string;
}

export const ULThemePasswordField = ({
  onVisibilityToggle,
  buttonClassName,
  showLabel = "Mostrar",
  hideLabel = "Ocultar",
  label = "Contraseña",
  error,
  wrapperClassName,
  className,
  labelClassName,
  ...props
}: ULThemePasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { formItemId } = useFormField();

  const handleToggle = () => {
    const newState = !showPassword;
    setShowPassword(newState);
    onVisibilityToggle?.(newState);
  };

  return (
    <div className={cn("w-full", wrapperClassName)}>
      {/* Static label */}
      <label
        htmlFor={formItemId}
        className={cn(ulThemeStaticLabelVariants, labelClassName)}
      >
        {label}
      </label>

      {/* Input + toggle button wrapper */}
      <div className="relative">
        <input
          id={formItemId}
          aria-invalid={error || undefined}
          type={showPassword ? "text" : "password"}
          className={cn(
            ulThemeStaticInputVariants,
            "pr-20",
            error &&
              "theme-universal:text-error theme-universal:border-error theme-universal:focus:border-error theme-universal:focus:ring-error",
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={handleToggle}
          className={cn(
            "absolute right-3 top-0 h-[45px]",
            "flex items-center",
            "cursor-pointer",
            "text-primary-button hover:text-base-hover-color",
            "text-sm font-bold",
            "transition-colors",
            "focus-visible:outline-none",
            "bg-transparent border-none outline-none",
            buttonClassName
          )}
          aria-label={showPassword ? hideLabel : showLabel}
        >
          {showPassword ? hideLabel : showLabel}
        </button>
      </div>
    </div>
  );
};

ULThemePasswordField.displayName = "ULThemePasswordField";
