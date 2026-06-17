import ULThemeSocialProviderButton from "@/components/ULThemeSocialProviderButton";
import { getIcon } from "@/utils/helpers/iconUtils";
import type { SocialConnection } from "@/utils/helpers/socialUtils";
import { getSocialProviderDetails } from "@/utils/helpers/socialUtils";
import { getCanalByClientId } from "@/utils/helpers/canalUtils";
import { pushLoginSocial } from "@/utils/helpers/dataLayerUtils";

import { useLoginIdManager } from "../hooks/useLoginIdManager";
import { Button } from "@/components/ui/button";
import useIsMobile from "@/hooks/useIsMobile";

const AlternativeLogins = () => {
  const {
    texts,
    locales,
    isPasskeyEnabled,
    showPasskeyAutofill,
    alternateConnections,
    handleFederatedLogin,
    handlePasskeyLogin,
  } = useLoginIdManager();

  // Handle text fallbacks in component
  const passkeyButtonText =
    locales?.alternativeLogins?.passkeyButtonText || texts?.passkeyButtonText || "";

  const isMobile = useIsMobile();
  
  const handleConnectionLogin = (connection: SocialConnection) => {
    const { displayName } = getSocialProviderDetails(connection);
    
    // dataLayer: event 'loginIntento'
    pushLoginSocial(displayName, "/login-universal", getCanalByClientId());

    const federatedLoginOptions = {
      connection: connection.name,
      ...(connection.metadata || {}),
    };

    handleFederatedLogin(federatedLoginOptions);
  };

  const handlePasskeyClick = () => {
    // dataLayer: event 'loginIntento' for Passkey
    pushLoginSocial("Passkey", "/login-universal", getCanalByClientId());
    handlePasskeyLogin();
  };

  // Only show passkey button if passkeys are enabled AND autofill is NOT active
  // When showPasskeyAutofill is true, passkey selection happens via input autocomplete
  const showPasskeyButton = isPasskeyEnabled && showPasskeyAutofill;

  return (
    <>
    {isMobile ? (
        // Mobile: label + botones circulares
        <div className="flex flex-col items-center gap-4 mt-2">
          <p className="text-center theme-universal:text-(length:--ul-theme-font-input-labels-size) theme-universal:font-input-label text-[--coppel-color-text-dark] italic">
            {locales?.alternativeLogins.mobileLabel}
          </p>
          <div className="flex flex-row justify-between w-full max-w-[341px] h-[72px]">
            {showPasskeyButton && (
              <ULThemeSocialProviderButton
                key="passkey"
                displayName={locales?.alternativeLogins?.passkeyLabel}
                buttonText={passkeyButtonText}
                iconComponent={<span className="text-primary">{getIcon()}</span>}
                onClick={handlePasskeyClick}
              />
            )}
            {alternateConnections?.map((connection: SocialConnection) => {
              if (!connection?.name) {
                return null;
              }

              const { displayName, iconComponent } =
                getSocialProviderDetails(connection);

              return (
                <Button
                  key={connection.name}
                  variant="outline"
                  onClick={() => handleConnectionLogin(connection)}
                  aria-label={`${locales?.alternativeLogins?.continueWithText} ${displayName}`}
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
    <div className="space-y-5 mt-1">
        {showPasskeyButton && (
          <ULThemeSocialProviderButton
            key="passkey"
            displayName={locales?.alternativeLogins?.passkeyLabel}
            buttonText={passkeyButtonText}
            iconComponent={<span className="text-primary">{getIcon()}</span>}
            onClick={handlePasskeyClick}
          />
        )}
        {alternateConnections?.map((connection: SocialConnection) => {
          if (!connection?.name) {
            return null;
          }

          const { displayName, iconComponent } =
            getSocialProviderDetails(connection);
          const socialButtonText = `${locales?.alternativeLogins?.continueWithText} ${displayName}`;
          return (
            <ULThemeSocialProviderButton
              key={connection.name}
              displayName={displayName}
              buttonText={socialButtonText}
              iconComponent={iconComponent}
              onClick={() => handleConnectionLogin(connection)}
            />
          );
        })}
      </div>)}
    </>
  );
};

export default AlternativeLogins;
