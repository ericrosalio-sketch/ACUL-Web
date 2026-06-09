import type { ReactNode } from "react";
import { COPPEL_CDN_SOCIAL_ICONS } from "@/constants/coppelConfig";

import {
  AppleIcon,
  DefaultConnectionIcon,
  GoogleIcon,
  MicrosoftIcon,
} from "@/assets/icons";

const STRATEGY_ICON_MAP: Record<string, React.ComponentType> = {
  google: GoogleIcon,       // strategy normalizada por el SDK (name: "google-oauth2")
  "google-oauth2": GoogleIcon, // fallback por si algún tenant envía el name como strategy
  apple: AppleIcon,
  windowslive: MicrosoftIcon,
};

export const getIcon = (strategy?: string): ReactNode => {
  // Si strategy es undefined, se usa ícono de fingerprint para representar "passwordless" (email o SMS).
  strategy ??= "fingerprint";
  // Primero intentamos obtener la URL del ícono desde el CDN de Coppel, si existe para esta estrategia.
  if (strategy && COPPEL_CDN_SOCIAL_ICONS[strategy]) {
    return (
      <img
        src={COPPEL_CDN_SOCIAL_ICONS[strategy]}
        alt={strategy}
        className="w-full h-full"
      />
    );
  }
  // Si no hay ícono en el CDN, intentamos obtener el componente de ícono desde el mapa de estrategias.
  console.warn(`No icon found for strategy "${strategy}", using default icon.`);
  const IconComponent =
    (strategy && STRATEGY_ICON_MAP[strategy]) ||
      DefaultConnectionIcon;
  return <IconComponent />;
};
