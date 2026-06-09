import { Button } from "@/components/ui/button";
import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";
import useIsMobile from "@/hooks/useIsMobile";
import type { SocialConnection } from "@/utils/helpers/socialUtils";
import { getSocialProviderDetails } from "@/utils/helpers/socialUtils";

import { useSignupIdManager } from "../hooks/useSignupIdManager";

const AlternativeLogins = () => {
  const {
    alternateConnections,
    handleFederatedSignup,
    locales,
  } = useSignupIdManager();

  const isMobile = useIsMobile();

  const handleConnectionSignup = (connection: SocialConnection) => {
    const federatedSignupOptions = {
      connection: connection.name,
      // Include any additional metadata if available
      ...(connection.metadata || {}),
    };

    handleFederatedSignup(federatedSignupOptions);
  };

  // Early return if no connections are available
  if (!alternateConnections || alternateConnections.length === 0) {
    return null;
  }

  return (
    <>
      {isMobile ? (
        // Mobile: botones circulares
        <div className="flex flex-row justify-center gap-6 mt-2">
          {alternateConnections.map((connection: SocialConnection) => {
            if (!connection?.name) {
              return null;
            }

            const { displayName, iconComponent } =
              getSocialProviderDetails(connection);

<<<<<<< HEAD
            return (
              <Button
                key={connection.name}
                variant="outline"
                onClick={() => handleConnectionSignup(connection)}
                aria-label={displayName}
                className="rounded-full w-20 h-20 p-0 flex items-center justify-center border:color:--ul-theme-color-secondary-button-border text-(color:--ul-theme-color-secondary-button-label)"
              >
                <span className="w-8 h-8 flex items-center justify-center">
                  {iconComponent}
                </span>
              </Button>
            );
          })}
        </div>
      ) : (
        // Desktop: botones alargados
        <div className="space-y-3 mt-2">
          {alternateConnections.map((connection: SocialConnection) => {
            if (!connection?.name) {
              return null;
            }

            const { displayName, iconComponent } =
              getSocialProviderDetails(connection);
            const socialButtonText = `${locales?.social?.continueWith} ${displayName}`;

            return (
              <ULThemeSocialProviderButton
                key={connection.name}
                displayName={displayName}
                buttonText={socialButtonText}
                iconComponent={iconComponent}
                onClick={() => handleConnectionSignup(connection)}
              />
            );
          })}
        </div>
      )}
    </>
=======
        return (
          <Button
            key={connection.name}
            variant="outline"
            onClick={() => handleConnectionSignup(connection)}
            aria-label={displayName}
            className="rounded-full w-20 h-20 p-0 flex items-center justify-center border:color:--ul-theme-color-secondary-button-border text-(color:--ul-theme-color-secondary-button-label)"
          >
            <span className="w-8 h-8 flex items-center justify-center">
              {iconComponent}
            </span>
          </Button>
        );
      })}
    </div>
>>>>>>> 79c02249 (	modified:   dist/assets/login-id/index.js)
  );
};

export default AlternativeLogins;
