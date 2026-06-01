import ULThemeLink from "@/components/ULThemeLink";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

// El Footer es un componente simple que muestra un mensaje de acción para registrarse, junto con un enlace al signupLink proporcionado por el hook useLoginIdManager.
// Solo se renderiza si signupLink está disponible, lo que permite flexibilidad en la configuración de la pantalla de login-id.
function Footer() {
  const { signupLink, texts, locales } = useLoginIdManager();

  if (!signupLink) {
    return null;
  }

  return (
    <div className="mt-4 text-left">
      <span className="pr-1 text-body-text text-(length:--ul-theme-font-body-text-size) font-body">
        {texts?.signupActionText || locales?.footer?.signupActionText}
      </span>
      <ULThemeLink href={signupLink}>
        {texts?.signupActionLinkText || locales?.footer?.signupActionLinkText}
      </ULThemeLink>
    </div>
  );
}

export default Footer;
