import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useSignupPasswordManager } from "../hooks/useSignupPasswordManager";

function Header() {
  const { texts, locales } = useSignupPasswordManager();

  // Use locale strings with fallback to SDK texts
  const logoAltText = locales.header.logoAlt || texts?.logoAltText;
  const title = locales.header.title || texts?.title;
  const description = locales.header.description || texts?.description;

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle>{title}</ULThemeTitle>
      <ULThemeSubtitle>{description}</ULThemeSubtitle>
    </>
  );
}

export default Header;
