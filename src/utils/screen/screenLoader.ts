// Auto-generated file

import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, React.ComponentType> = {
  
  "login-id": lazy(() => import("@/screens/login-id")),
  "signup-id": lazy(() => import("@/screens/signup-id")),
  "signup-password": lazy(() => import("@/screens/signup-password")),
  "passkey-enrollment": lazy(() => import("@/screens/passkey-enrollment"))

};

export const getScreenComponent = (
  screenName: string | undefined
): React.ComponentType | null => {
  if (!screenName) {
    return null;
  }
  return SCREEN_COMPONENTS[screenName] || null;
};
