import type { SVGProps } from "react";

/**
 * Icono oficial de Google con los 4 colores reales de la marca.
 * SVG inline para garantizar que Rollup/Vite lo incluya en el bundle
 * sin riesgo de tree-shaking o dependencias externas.
 */
export const GoogleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="30px"
    height="30px"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Rojo — parte superior izquierda */}
    <path
      d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 0 1-1.996 3.018v2.51h3.232C18.344 15.78 19.6 13.17 19.6 10.227z"
      fill="#4285F4"
    />
    {/* Azul — parte superior derecha */}
    <path
      d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.596-4.123H1.064v2.59A9.996 9.996 0 0 0 10 20z"
      fill="#34A853"
    />
    {/* Verde — parte inferior */}
    <path
      d="M4.404 11.9A5.987 5.987 0 0 1 4.09 10c0-.663.114-1.305.314-1.9V5.51H1.064A9.996 9.996 0 0 0 0 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z"
      fill="#FBBC05"
    />
    {/* Amarillo — parte izquierda */}
    <path
      d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959 .99 12.695 0 10 0A9.996 9.996 0 0 0 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z"
      fill="#EA4335"
    />
  </svg>
);
