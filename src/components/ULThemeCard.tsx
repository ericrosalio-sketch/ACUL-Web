import { cn } from "@/lib/utils";

import { Card } from "./ui/card";

export interface ULThemeCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The content of the card element.
   */
  children: React.ReactNode;
  /**
   * Optional class names for additional styling or overriding default styles.
   */
  className?: string;
}

const ULThemeCard = ({ children, className, ...rest }: ULThemeCardProps) => {
  const themeClasses = cn(
    "px-5",  // Base padding - overridden by theme variable --ul-theme-card-padding (if set)
    "py-0",  // Base padding - overridden by theme variable --ul-theme-card-padding (if set)
    "min-w-[360px]",
    "theme-universal:bg-widget-bg",
    "theme-universal:border-(--color-widget-border)",
    "theme-universal:rounded-widget",
    "theme-universal:shadow-widget",
    "theme-universal:border-(length:--border-widget)",
    className
  );

  return (
    <Card className={themeClasses} {...rest}>
      {children}
    </Card>
  );
};

export default ULThemeCard;
