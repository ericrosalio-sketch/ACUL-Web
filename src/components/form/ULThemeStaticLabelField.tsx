import { cva } from "class-variance-authority";

import { useFormField } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import * as React from "react";

const ulThemeStaticInputVariants = cva(
  [
    // Layout & Spacing
    "mb-2",

    // Base Background & Colors
    "theme-universal:bg-input-bg",
    "theme-universal:text-input-text",

    // Border Styling
    "theme-universal:border-(length:--ul-theme-border-input-border-weight)",
    "theme-universal:border-input-border",

    // Border Radius
    "theme-universal:rounded-input",

    // Typography - Input Text
    "theme-universal:text-(length:--ul-theme-font-body-text-size)",
    "theme-universal:font-body-text",

    // Placeholder Styling
    "theme-universal:placeholder:text-input-labels",
    "theme-universal:placeholder:text-(length:--ul-theme-font-input-labels-size)",
    "theme-universal:placeholder:font-input-label",
  ],
  {
    variants: {
      themeState: {
        default: [
          // Focus States - Default
          "theme-universal:focus:border-base-focus",
          "theme-universal:focus:ring-1",
          "theme-universal:focus:ring-base-focus",
        ],
        error: [
          // Error States
          "theme-universal:text-error",
          "theme-universal:border-error",
          "theme-universal:focus:border-error",
          "theme-universal:focus:ring-1",
          "theme-universal:focus:ring-error",
        ],
      },
    },
    defaultVariants: {
      themeState: "default",
    },
  }
);

const ulThemeStaticLabelVariants = cva(
  [
    // Base label styles
    "block mb-1",

    // Typography - Label
    "theme-universal:text-(length:--ul-theme-font-input-labels-size)",
    "theme-universal:font-input-label",
  ],
  {
    variants: {
      themeState: {
        default: [
          // Use the header color token for the static label
          "text-[#081754]",
        ],
        error: ["theme-universal:text-error"],
      },
    },
    defaultVariants: {
      themeState: "default",
    },
  }
);

export interface ULThemeStaticLabelFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Text displayed as the static label above the input */
  label: string;
  /** Whether the field has an error state */
  error?: boolean;
  /** Additional class for the outer wrapper div */
  wrapperClassName?: string;
  /** Marks the field as required (adds * to label) */
  isRequired?: boolean;
}

/**
 * A form field with a **static label** placed above the input and correctly
 * associated via `htmlFor` / `id`.  Use this instead of ULThemeFloatingLabelField
 * when UX requires the label to always be visible above the field (no floating
 * effect) while still meeting WCAG accessibility requirements.
 */
function ULThemeStaticLabelField({
  label,
  error = false,
  wrapperClassName,
  isRequired,
  className,
  ...props
}: ULThemeStaticLabelFieldProps) {
  // Pull the generated formItemId from the surrounding FormItem context so that
  // the label's htmlFor matches the input's id automatically, exactly as
  // ULThemeFloatingLabelField does.
  const { formItemId } = useFormField();

  const themeState = error ? "error" : "default";

  return (
    <div className={cn("w-full", wrapperClassName)}>
      {/* Static label – always visible above the input, correctly associated */}
      <label
        htmlFor={formItemId}
        className={cn(ulThemeStaticLabelVariants({ themeState }))}
      >
        {label}
      </label>

      {/* Plain input – no floating behaviour */}
      <input
        id={formItemId}
        aria-required={isRequired}
        aria-invalid={error || undefined}
        className={cn(
          // Structural base styles matching FloatingLabelField input
          "w-full h-[45px] rounded-[8px] px-3 py-2 outline-none",
          "bg-white border border-[#C9C9C9]",
          "transition-[color,box-shadow] duration-150 ease-in-out",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          "disabled:pointer-events-none disabled:opacity-50",
          // Autofill reset
          "autofill:bg-transparent",
          "autofill:[-webkit-text-fill-color:inherit]",
          "autofill:[transition:background-color_9999s_ease-in-out_0s]",
          ulThemeStaticInputVariants({ themeState }),
          className
        )}
        {...props}
      />
    </div>
  );
}

ULThemeStaticLabelField.displayName = "ULThemeStaticLabelField";

export { ULThemeStaticLabelField };
