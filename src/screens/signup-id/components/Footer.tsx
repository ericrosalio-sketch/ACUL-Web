import ULThemeLink from "@/components/ULThemeLink";

import { useSignupIdManager } from "../hooks/useSignupIdManager";

function Footer() {
  const { loginLink, texts, locales } = useSignupIdManager();

  if (!loginLink) {
    return null;
  }

  // Use locale strings with fallback to SDK texts
  const footerText = locales.footer.text || texts?.footerText;
  const footerLinkText = locales.footer.linkText || texts?.footerLinkText;

  return (
    <div className="mt-4 text-center">
      <span className="pr-1 text-body-text text-(length:--ul-theme-font-body-text-size) font-body">
        {footerText}
      </span>
      {loginLink && (
        <ULThemeLink href={loginLink}>{footerLinkText}</ULThemeLink>
      )}
    </div>
  );
}

export default Footer;
