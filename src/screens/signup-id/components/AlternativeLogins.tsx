import { Button } from "@/components/ui/button";
import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";
import useIsMobile from "@/hooks/useIsMobile";
import { getCanalByClientId } from "@/utils/helpers/canalUtils";
import { pushCrearCuentaSocial } from "@/utils/helpers/dataLayerUtils";
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
    const { displayName } = getSocialProviderDetails(connection);

    // dataLayer: evento crearCuenta al seleccionar login social
    // Normalizamos el displayName al tipo esperado por el modelo de medición
    const socialTypes = ["Passkey", "Google", "Apple", "Microsoft"] as const;
    type SocialType = (typeof socialTypes)[number];
    const cuentaTipo: SocialType = socialTypes.find(
      (t) => t.toLowerCase() === displayName.toLowerCase()
    ) ?? "Google";
    pushCrearCuentaSocial(cuentaTipo, "/crear-cuenta", getCanalByClientId());

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
        // Mobile: label + botones circulares
        <div className="flex flex-col items-center gap-4 mt-2">
          <p className="text-center theme-universal:text-(length:--ul-theme-font-input-labels-size) theme-universal:font-input-label text-[--coppel-color-text-dark] italic">
            {locales?.social?.mobileLabel}
          </p>
          <div className="flex flex-row justify-between w-full max-w-[341px] h-[72px]">
            {alternateConnections.map((connection: SocialConnection) => {
              if (!connection?.name) {
                return null;
              }

              const { displayName, iconComponent } =
                getSocialProviderDetails(connection);

              return (
                <Button
                  key={connection.name}
                  variant="outline"
                  onClick={() => handleConnectionSignup(connection)}
                  aria-label={`${locales?.social?.continueWith} ${displayName}`}
                  className="rounded-full w-[72px] h-[72px] p-0 flex items-center justify-center border-0 text-(color:--ul-theme-color-secondary-button-label)"
                >
                  <span className="w-9 h-9 flex items-center justify-center">
                    {iconComponent}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      ) : (
        // Desktop: botones alargados
        <div className="space-y-5 mt-2">
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
  );
};

export default AlternativeLogins;
