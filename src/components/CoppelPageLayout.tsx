/**
 * CoppelPageLayout.tsx
 *
 * Layout global de página que integra el header y footer de Coppel
 * extraídos del branding_templates/universal_login.html del repositorio auth0-repo.
 *
 * Estructura equivalente al <body> del template:
 *   display: flex, flex-direction: column, min-height: 100vh
 *   ┌─────────────────────────────────────────┐
 *   │  <CoppelPageHeader />   (height: auto)  │
 *   ├─────────────────────────────────────────┤
 *   │  <main>                 (flex-grow: 1)  │
 *   │    {children}                           │
 *   │  </main>                                │
 *   ├─────────────────────────────────────────┤
 *   │  <CoppelPageFooter />   (sticky bottom) │
 *   └─────────────────────────────────────────┘
 *
 * El <main> replica el comportamiento del CSS del template:
 *   min-height: calc(100vh - 118px)
 *   flex-grow: 1
 *   display: flex, align-items: center, justify-content: center
 *   padding: 0 16px
 *
 * USO en pantallas ACUL:
 *   Reemplaza <ULThemePageLayout> cuando se quiere el layout completo
 *   de Coppel con header y footer globales.
 *
 *   <CoppelPageLayout>
 *     <ULThemeCard>...</ULThemeCard>
 *   </CoppelPageLayout>
 */

import type { HTMLAttributes, ReactNode } from "react";

import CoppelPageFooter, { type CoppelPageFooterProps } from "./CoppelPageFooter";
import CoppelPageHeader, { type CoppelPageHeaderProps } from "./CoppelPageHeader";

export interface CoppelPageLayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Contenido principal de la pantalla (la card ACUL, formularios, etc.) */
  children: ReactNode;

  /** Props opcionales para personalizar el header */
  headerProps?: CoppelPageHeaderProps;

  /** Props opcionales para personalizar el footer */
  footerProps?: CoppelPageFooterProps;

  /**
   * Si es true, no renderiza el header global de Coppel.
   * Útil en pantallas que tienen su propio header interno.
   * Default: false
   */
  hideHeader?: boolean;

  /**
   * Si es true, no renderiza el footer global de Coppel.
   * Default: false
   */
  hideFooter?: boolean;

  /**
   * Color de fondo del body/página.
   * En el template es el color de fondo del <body> (configurable por tenant).
   * Default: usa la variable CSS --ul-theme-page-bg-background-color del tema Auth0.
   */
  backgroundColor?: string;
}

const CoppelPageLayout = ({
  children,
  headerProps,
  footerProps,
  hideHeader = false,
  hideFooter = false,
  backgroundColor,
  className,
  style,
  ...rest
}: CoppelPageLayoutProps) => {
  return (
    /**
     * Equivalente al <body class="_widget-auto-layout"> del template:
     *   display: flex
     *   flex-direction: column
     *   min-height: 100vh
     *   width: 100%
     *   overflow-x: hidden
     *   margin: 0, padding: 0
     */
    <div
      className={`flex flex-col min-h-screen w-full overflow-x-hidden ${className ?? ""}`}
      style={{
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        // Si se provee backgroundColor, se usa; sino se respeta el fondo del body
        // que ya está definido en index.css por --ul-theme-page-bg-background-color
        ...(backgroundColor ? { backgroundColor } : {}),
        ...style,
      }}
      {...rest}
    >
      {/* Header global de Coppel — equivalente al <header class="header"> */}
      {!hideHeader && <CoppelPageHeader {...headerProps} />}

      {/*
        Área de contenido principal — equivalente al <main> del template:
          flex-grow: 1 → empuja el footer hacia abajo (sticky footer pattern)
          display: flex, align-items: center, justify-content: center
          padding: 0 16px
          min-height: calc(100vh - 118px) — 118px aprox. header + footer

        En móvil: padding-bottom: 80px para que el sticky footer no tape el contenido
      */}
      <main
        className="flex-1 flex items-center justify-center px-4 py-0 w-full max-w-full pb-20"
        style={{
          boxSizing: "border-box",
          minHeight: "calc(100vh - 118px)",
        }}
      >
        {children}
      </main>

      {/* Footer global de Coppel — equivalente al <footer class="footer"> */}
      {!hideFooter && <CoppelPageFooter {...footerProps} />}
    </div>
  );
};

export default CoppelPageLayout;
