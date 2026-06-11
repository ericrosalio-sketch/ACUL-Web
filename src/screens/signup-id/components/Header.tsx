import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useSignupIdManager } from "../hooks/useSignupIdManager";

function Header() {
  const { texts, locales } = useSignupIdManager();

  // Use locale strings with fallback to SDK texts
  const logoAltText = locales.header.logoAlt || texts?.logoAltText || "";
  const title = locales.header.title || texts?.title;
  

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{title}</ULThemeTitle>
    </>
  );
}

export default Header;
