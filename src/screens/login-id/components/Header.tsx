import ULThemeLogo from "@/components/ULThemeLogo";
import ULThemeTitle from "@/components/ULThemeTitle";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

function Header() {
  const { texts, locales, appName } = useLoginIdManager();

  // Use locale strings as fallback to SDK texts
  const logoAltText = locales?.header?.logoAltText || texts?.logoAltText || "";

  return (
    <>
      <ULThemeLogo altText={logoAltText}></ULThemeLogo>
      {appName && (
        <p className="text-xs text-gray-400 text-center mb-2">
          Accediendo a: <strong>{appName}</strong>
        </p>
      )}
      <ULThemeTitle>{locales?.header?.title || texts?.title}</ULThemeTitle>
    </>
  );
}

export default Header;
