import { useState, useEffect } from "react";

/**
 * Hook que detecta si la pantalla actual es de dispositivo móvil.
 * @param breakpoint - Ancho en px a partir del cual se considera desktop (default: 768, equivalente al `md` de Tailwind)
 * @returns `true` si el ancho de la ventana es menor al breakpoint, `false` si es desktop.
 */
const useIsMobile = (breakpoint = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(
    () => window.innerWidth < breakpoint
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
};

export default useIsMobile;
