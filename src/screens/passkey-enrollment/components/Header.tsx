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
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle className="mb-10">{titleText}</ULThemeTitle>
    </>
  );
}

export default Header;
