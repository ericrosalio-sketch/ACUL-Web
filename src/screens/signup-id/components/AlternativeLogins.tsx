import { Button } from "@/components/ui/button";
import type { SocialConnection } from "@/utils/helpers/socialUtils";
import { getSocialProviderDetails } from "@/utils/helpers/socialUtils";

import { useSignupIdManager } from "../hooks/useSignupIdManager";

const AlternativeLogins = () => {
  const {
    alternateConnections,
    handleFederatedSignup,
  } = useSignupIdManager();

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
    <div className="flex flex-row justify-center gap-3 mt-2">
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
            aria-label={displayName}
            className="rounded-full w-16 h-16 p-0 flex items-center justify-center border-gray-300"
          >
            <span className="w-5 h-5 flex items-center justify-center">
              {iconComponent}
            </span>
          </Button>
        );
      })}
    </div>
  );
};

export default AlternativeLogins;
