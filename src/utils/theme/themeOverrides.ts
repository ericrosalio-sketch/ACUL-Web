/**
 * Screen-specific theme override utility.
 *
 * Use this to protect specific CSS variables from being overwritten
 * by the Auth0 Dashboard branding values on a per-screen basis.
 *
 * USAGE:
 * ```tsx
 * // In your screen's index.tsx, call AFTER applyAuth0Theme():
 * applyAuth0Theme(screenInstance);
 * applyScreenThemeOverrides([
 *   { variable: "--ul-theme-page-bg-background-color", value: "#1a1a2e" },
 *   { variable: "--ul-theme-color-primary-button", value: "#ff6b35" },
 * ]);
 * ```
 *
 * WHY THIS WORKS:
 * applyAuth0Theme() writes CSS custom properties to document.documentElement.style.
 * Calling setProperty() again with a new value simply overwrites the previous one,
 * since the last write wins. This lets each screen protect specific variables
 * while still applying the rest of the Dashboard branding.
 */

export interface ScreenThemeOverride {
  /** The CSS custom property name, e.g. "--ul-theme-page-bg-background-color" */
  variable: string;
  /** The value to force for this screen, e.g. "#1a1a2e" or "url(...)" */
  value: string;
}

/**
 * Applies screen-specific CSS variable overrides AFTER the Dashboard branding
 * has been applied via applyAuth0Theme(). Variables listed here will NOT be
 * affected by Dashboard branding for this specific screen render.
 *
 * @param overrides - Array of { variable, value } pairs to force on this screen.
 */
export function applyScreenThemeOverrides(
  overrides: ScreenThemeOverride[]
): void {
  if (!overrides || overrides.length === 0) return;

  const style = document.documentElement.style;

  overrides.forEach(({ variable, value }) => {
    if (variable && value !== undefined) {
      style.setProperty(variable, value);
    }
  });
}
