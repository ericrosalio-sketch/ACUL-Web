import { BaseContext } from '../../models/base-context';
import type { WebAuthnErrorDetails } from '../../../interfaces/common';
import type { MfaWebAuthnRoamingChallengeMembers, ScreenMembersOnMfaWebAuthnRoamingChallenge as ScreenOptions, VerifySecurityKeyOptions, ReportWebAuthnErrorOptions, TryAnotherMethodOptions } from '../../../interfaces/screens/mfa-webauthn-roaming-challenge';
/**
 * @class MfaWebAuthnRoamingChallenge
 * @extends BaseContext
 * implements MfaWebAuthnRoamingChallengeMembers
 * description Manages interactions for the MFA WebAuthn Roaming Challenge screen.
 * This screen prompts the user to use their security key (roaming authenticator) to verify their identity.
 * It handles the WebAuthn `navigator.credentials.get()` API call, submission of the resulting credential,
 * provides a method for explicitly reporting browser-side WebAuthn errors, and offers an option
 * to try a different MFA method.
 */
export default class MfaWebAuthnRoamingChallenge extends BaseContext implements MfaWebAuthnRoamingChallengeMembers {
    /**
     * static
     * @property {string} screenIdentifier - The unique identifier for the 'mfa-webauthn-roaming-challenge' screen.
     */
    static screenIdentifier: string;
    /**
     * @property {ScreenOptions} screen - Holds the specific screen data and properties,
     * processed by `ScreenOverride`. This includes `publicKeyChallengeOptions` for the WebAuthn API call.
     */
    screen: ScreenOptions;
    /**
     * Initializes a new instance of the `MfaWebAuthnRoamingChallenge` class.
     * @throws {Error} If the Universal Login Context is not available or if the screen name
     * in the context does not match `MfaWebAuthnRoamingChallenge.screenIdentifier`.
     */
    constructor();
    verify(options?: VerifySecurityKeyOptions): Promise<void>;
    reportWebAuthnError(options: ReportWebAuthnErrorOptions): Promise<void>;
    tryAnotherMethod(options?: TryAnotherMethodOptions): Promise<void>;
}
export { MfaWebAuthnRoamingChallengeMembers, ScreenOptions as ScreenMembersOnMfaWebAuthnRoamingChallenge, VerifySecurityKeyOptions, ReportWebAuthnErrorOptions, TryAnotherMethodOptions, WebAuthnErrorDetails, };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map