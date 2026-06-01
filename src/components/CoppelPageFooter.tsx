/**
 * CoppelPageFooter.tsx
 *
 * Footer global de página inspirado en el branding_templates/universal_login.html
 * del repositorio auth0-repo.
 *
 * Replica fielmente el <footer class="footer"> del template:
 *  - Texto de copyright alineado a la izquierda
 *  - Links "Aviso de privacidad" y "Términos y condiciones" a la derecha
 *  - Fondo gris claro #F1F4FA con borde superior #D9E3F2
 *  - En móvil: layout en columna, todo centrado
 *  - Posición sticky en desktop, sticky en móvil (equivalente al comportamiento
 *    del JS del template que pone position: fixed en móvil y relative en desktop)
 *
 * Equivalencias con el template Liquid:
 *   privacidadUrl → {{ application.metadata['privacidad-url'] }}
 *   tycUrl        → {{ application.metadata['TyC-url'] }}
 *   copyright     → texto estático "2025 © Coppel todos los derechos reservados"
 */

import { COPPEL_TEXTS, COPPEL_URLS } from "@/constants/coppelConfig";

export interface CoppelPageFooterProps {
  /**
   * URL del Aviso de Privacidad.
   * Equivalente a: {{ application.metadata['privacidad-url'] }}
   * Default: URL pública de Coppel.
   */
  privacidadUrl?: string;

  /**
   * URL de Términos y Condiciones.
   * Equivalente a: {{ application.metadata['TyC-url'] }}
   * Default: URL pública de Coppel.
   */
  tycUrl?: string;

  /**
   * Texto de copyright.
   * Default: "2025 © Coppel todos los derechos reservados"
   */
  copyright?: string;
}

const CoppelPageFooter = ({
  privacidadUrl = COPPEL_URLS.privacidadUrl,
  tycUrl = COPPEL_URLS.tycUrl,
  copyright = COPPEL_TEXTS.copyright,
}: CoppelPageFooterProps) => {
  return (
    /**
     * Estructura equivalente al <footer class="footer"> del template:
     *   background: #F1F4FA
     *   border-top: 1px solid #D9E3F2
     *   padding: 7px
     *   width: 100%
     *   position: sticky (bottom: 0) — equivalente al comportamiento JS del template
     *   z-index: 10
     *
     * En el template original, el JS aplica position:fixed en móvil y
     * position:relative en desktop. Aquí usamos sticky para lograr
     * el mismo efecto sin JS adicional.
     */
    <footer
      className="w-full fixed bottom-0 left-0 right-0 z-10"
      style={{
        backgroundColor: "#F1F4FA",
        borderTop: "1px solid #D9E3F2",
        padding: "7px",
        boxSizing: "border-box",
      }}
    >
      {/*
        .footer-content del template:
          display: flex, justify-content: space-between, align-items: center
          max-width: 1216px, margin: 0 auto
          En móvil: flex-direction: column, text-align: center, gap: 8px
      */}
      <div
        className="flex flex-row flex-wrap justify-between items-center gap-0 w-full max-w-[1216px] mx-auto
                   max-[768px]:flex-col max-[768px]:gap-2 max-[768px]:text-center"
        style={{ boxSizing: "border-box" }}
      >
        {/*
          .footer-text del template:
            font-family: 'Helvetica Neue', font-size: 12px, color: #081754
        */}
        <span
          className="m-0"
          style={{
            fontFamily: "'Helvetica Neue', sans-serif",
            fontWeight: 400,
            fontSize: "12px",
            lineHeight: "16px",
            color: "#081754",
          }}
        >
          {copyright}
        </span>

        {/*
          .footer-links del template:
            display: flex, gap: 16px, justify-content: flex-end
            En móvil: justify-content: center, width: 100%
        */}
        <div
          className="flex flex-row flex-wrap justify-end items-center gap-4
                     max-[768px]:justify-center max-[768px]:w-full"
        >
          {/*
            .footer-link del template:
              font-family: 'Poppins', font-weight: 700, font-size: 14px
              color: #1C42E8, text-decoration: none
              hover: text-decoration: underline
          */}
          <a
            href={privacidadUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              lineHeight: "22px",
              color: "#1C42E8",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.textDecoration = "none")
            }
          >
            {COPPEL_TEXTS.privacidadLabel}
          </a>

          <a
            href={tycUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              lineHeight: "22px",
              color: "#1C42E8",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.textDecoration = "none")
            }
          >
            {COPPEL_TEXTS.tycLabel}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default CoppelPageFooter;
