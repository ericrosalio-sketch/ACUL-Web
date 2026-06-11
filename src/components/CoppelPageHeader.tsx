/**
 * CoppelPageHeader.tsx
 *
 * Header global de página inspirado en el branding_templates/universal_login.html
 * del repositorio auth0-repo.
 *
 * Replica fielmente el comportamiento del <header class="header"> del template:
 *  - Logo Coppel a la izquierda → redirige a homeUrl en desktop, logoutUrl en móvil
 *  - Botón "Volver a inicio" con icono casita a la derecha → redirige a logoutUrl
 *  - En móvil (≤ 500px): el botón se oculta y el logo se centra
 *  - Fondo azul Coppel #1C42E8
 *
 * Equivalencias con el template Liquid:
 *   logoUrl         → hardcodeado desde CDN (antes en <img src=...> del template)
 *   homeUrl         → "https://coppel.com" (href del <a class="header-logo">)
 *   logoutUrl       → {{ application.metadata.logout_url }}
 *   onHomeClick     → JS inline del template (dataLayer push + redirect)
 */

import { COPPEL_CDN, COPPEL_TEXTS, COPPEL_URLS } from "@/constants/coppelConfig";
import { getCanalByClientId } from "@/utils/helpers/canalUtils";
import { pushMenuSuperior } from "@/utils/helpers/dataLayerUtils";

export interface CoppelPageHeaderProps {
  /**
   * URL de la imagen del logo.
   * Default: CDN de Coppel (mismo que branding_templates).
   */
  logoUrl?: string;

  /**
   * URL a la que navega el logo en desktop.
   * Equivalente al href del <a class="header-logo"> en el template.
   * Default: "https://www.coppel.com"
   */
  homeUrl?: string;

  /**
   * URL a la que redirige el botón "Volver a inicio" y el logo en móvil.
   * Equivalente a {{ application.metadata.logout_url }} en el template.
   * Default: "https://www.coppel.com"
   */
  logoutUrl?: string;
}

const CoppelPageHeader = ({
  logoUrl = COPPEL_CDN.logoUrl,
  homeUrl = COPPEL_URLS.homeUrl,
  logoutUrl = COPPEL_URLS.logoutUrl,
}: CoppelPageHeaderProps) => {
  /**
   * Manejo del click en el logo.
   * - Desktop: navega a homeUrl (www.coppel.com)
   * - Móvil (≤ 500px): navega a logoutUrl (igual que "Volver a inicio")
   * Replica el comportamiento del JS inline del template.
   */
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // dataLayer: evento clicMenuSuperiorGeneral al click en logo
    pushMenuSuperior("Logo Coppel", getCanalByClientId());
    const isMobile = window.innerWidth <= 500;
    const target = isMobile ? logoutUrl : homeUrl;
    setTimeout(() => {
      window.location.href = target;
    }, 200);
  };

  /**
   * Manejo del click en el botón "Volver a inicio".
   * Siempre redirige a logoutUrl.
   * Replica el comportamiento del JS inline del template.
   */
  const handleHomeButtonClick = () => {
    // dataLayer: evento clicMenuSuperiorGeneral al click en "Volver a inicio"
    pushMenuSuperior("Volver a inicio", getCanalByClientId());
    setTimeout(() => {
      window.location.href = logoutUrl;
    }, 200);
  };

  return (
    /**
     * Estructura equivalente al <header class="header"> del template:
     *   background: #1C42E8
     *   display: flex, justify-content: space-between, align-items: center
     *   padding: 8px 16px, gap: 16px, z-index: 10
     */
    <header
      className="w-full flex flex-row justify-between items-center px-4 py-2 gap-4 z-10"
      style={{
        backgroundColor: "var(--coppel-color-header-bg)", // #1C42E8
        borderBottom: "1px solid var(--coppel-color-border-light)", // #D9E3F2
        boxSizing: "border-box",
      }}
    >
      {/* Logo Coppel — .header-logo del template */}
      {/* aria-label removed: the <img> alt below already names this link */}
      <a
        href={homeUrl}
        onClick={handleLogoClick}
        className="flex flex-row items-center gap-2"
        style={{ textDecoration: "none" }}
      >
        <img
          src={logoUrl}
          alt={COPPEL_TEXTS.logoAlt}
          style={{ width: "175px", height: "35px", display: "block" }}
          onError={(e) => {
            // Fallback: oculta la imagen si el CDN no está disponible (dev local)
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      </a>

      {/*
        Botón "Volver a inicio" — .header-button-normal del template
        Se oculta en pantallas ≤ 500px (max-[500px]:hidden)
        En el template original usa @media (max-width: 500px) { display: none }
      */}
      <button
        onClick={handleHomeButtonClick}
        className="max-[500px]:hidden flex flex-row justify-center items-center gap-2 px-3 py-2 rounded-full border-none cursor-pointer font-semibold text-base transition-colors duration-300"
        style={{
          backgroundColor: "var(--ul-theme-color-primary-button)", // #1C42E8
          color: "var(--ul-theme-color-primary-button-label)", // #FFFFFF
          fontFamily: "'Poppins', sans-serif",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--ul-theme-color-base-hover-color)") // #081754
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--ul-theme-color-primary-button)") // #1C42E8
        }
        // aria-label removed: the visible <span> text below already names this button.
      >
        {/* Icono casita SVG del CDN — decorativo, oculto para lectores de pantalla */}
        <img
          src={COPPEL_CDN.casitaIconUrl}
          alt=""
          aria-hidden="true"
          style={{ width: "20px", height: "20px" }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
        <span>{COPPEL_TEXTS.volverInicio}</span>
      </button>
    </header>
  );
};

export default CoppelPageHeader;
