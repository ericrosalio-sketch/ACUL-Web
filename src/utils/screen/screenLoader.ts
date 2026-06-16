// Auto-generated file

import { lazy } from "react";

const SCREEN_COMPONENTS: Record<string, React.ComponentType> = {
  
  "login-id": lazy(() => import("@/screens/login-id")),
  "signup-id": lazy(() => import("@/screens/signup-id")),
  "signup-password": lazy(() => import("@/screens/signup-password")),
  "passkey-enrollment": lazy(() => import("@/screens/passkey-enrollment")),
  "login-password": lazy(() => import("@/screens/login-password")),
  "reset-password-request": lazy(() => import("@/screens/reset-password-request")),
};

export const getScreenComponent = (
  screenName: string | undefined
): React.ComponentType | null => {
  if (!screenName) {
    return null;
  }
  return SCREEN_COMPONENTS[screenName] || null;
};
