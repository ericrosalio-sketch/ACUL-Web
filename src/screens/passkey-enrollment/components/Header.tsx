import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeTitle from "@/components/ULThemeTitle";

import { usePasskeyEnrollmentManager } from "../hooks/usePasskeyEnrollmentManager";

function Header() {
  const { texts, locales } = usePasskeyEnrollmentManager();

  // Use Locales as fallback to SDK texts
  const titleText = locales.heading.title || texts?.title;
  const logoAltText = locales.heading.logoAltText || texts?.logoAltText || "";

  return (
    <>
      <ULThemeLogo altText={logoAltText} className="hidden"></ULThemeLogo>
      {/* Puedes modificar el espacio superior cambiando el valor de 'mt-12' (ej. mt-8, mt-10, mt-16) */}
      <ULThemeTitle className="mt-12 mb-6">{titleText}</ULThemeTitle>
    </>
  );
}

export default Header;
