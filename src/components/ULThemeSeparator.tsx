import { cn } from "@/lib/utils";

export interface ULThemeSeparatorProps {
  /**
   * Optional text to display in the middle of the separator
   */
  text?: string;
  /**
   * Optional class names for additional styling or overriding default styles
   */
  className?: string;
}

const ULThemeSeparator = ({ text, className }: ULThemeSeparatorProps) => {
  // Base styles
  const containerStyles = "relative flex items-center my-4";

  // Theme overrides for line
  const themedLineStyles = cn(
    "flex-grow border-t",
    "theme-universal:border-input-border"
  );

  // Theme overrides for text
  const themedTextStyles = cn(
    "flex-shrink px-2",
    "theme-universal:text-body-text",
    "theme-universal:text-(length:--ul-theme-font-body-text-size)",
    "theme-universal:font-body"
  );

  if (text) {
    return (
      // aria-hidden: the "O" separator is purely decorative for sighted users.
      // Screen readers skip it entirely — the surrounding context (form fields
      // above and social buttons below) already provides enough information.
      <div className={cn(containerStyles, className)} aria-hidden="true">
        <div className={themedLineStyles} />
        <span className={themedTextStyles}>{text}</span>
        <div className={themedLineStyles} />
      </div>
    );
  }

  // Plain <hr> separators are also decorative; hide from assistive technology.
  return <hr className={cn("my-4", themedLineStyles, className)} aria-hidden="true" />;
};

export default ULThemeSeparator;
