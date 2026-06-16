import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useLoginPasswordManager } from "../hooks/useLoginPasswordManager";

function Header() {
  const { texts, locales } = useLoginPasswordManager();

  // Use locale strings as fallback to SDK texts
  const logoAltText = texts?.logoAltText || locales?.heading?.logoAltText;

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      <ULThemeTitle className="m-0">
        {texts?.title || locales?.heading?.title}
      </ULThemeTitle>
      <ULThemeSubtitle className="m-0">
        {texts?.description || locales?.heading?.description}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
