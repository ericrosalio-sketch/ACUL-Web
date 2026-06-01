import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeSubtitle from "@/components/ULThemeSubtitle";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

function Header() {
  const { texts, locales, appName } = useLoginIdManager();

  // Use locale strings as fallback to SDK texts
  const logoAltText = texts?.logoAltText || locales?.heading?.logoAltText;

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      {appName && (
        <p className="text-xs text-gray-400 text-center mb-2">
          Accediendo a: <strong>{appName}</strong>
        </p>
      )}
      <ULThemeTitle>{texts?.title || locales?.heading?.title}</ULThemeTitle>
      <ULThemeSubtitle>
        {texts?.description || locales?.heading?.description}
      </ULThemeSubtitle>
    </>
  );
}

export default Header;
