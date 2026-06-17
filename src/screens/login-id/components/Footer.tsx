import ULThemeLink from "@/components/ULThemeLink";
import { getCanalByClientId } from "@/utils/helpers/canalUtils";
import { pushClicHipervinculo } from "@/utils/helpers/dataLayerUtils";

import { useLoginIdManager } from "../hooks/useLoginIdManager";

// El Footer es un componente simple que muestra un mensaje de acción para registrarse, junto con un enlace al signupLink proporcionado por el hook useLoginIdManager.
// Solo se renderiza si signupLink está disponible, lo que permite flexibilidad en la configuración de la pantalla de login-id.
function Footer() {
  const { signupLink, texts, locales } = useLoginIdManager();

  if (!signupLink) {
    return null;
  }

  const handleSignupClick = () => {
    const linkText = locales?.footer?.signupActionLinkText || texts?.signupActionLinkText || "";
    // dataLayer: event 'clicClienteDigital' for signup link
    pushClicHipervinculo(`Crear cuenta - ${linkText}`, "/login-universal", getCanalByClientId());
  };

  return (
    <div className="mt-4 text-center">
      <span className="pr-1 text-body-text text-(length:--ul-theme-font-body-text-size) font-body">
        {locales?.footer?.signupActionText || texts?.signupActionText}
      </span>
      <ULThemeLink href={signupLink} onClick={handleSignupClick}>
        {locales?.footer?.signupActionLinkText || texts?.signupActionLinkText}
      </ULThemeLink>
    </div>
  );
}

export default Footer;
