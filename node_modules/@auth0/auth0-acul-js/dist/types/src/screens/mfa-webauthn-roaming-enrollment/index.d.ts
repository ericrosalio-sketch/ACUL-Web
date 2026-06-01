import { BaseContext } from '../../models/base-context';
import type { CustomOptions, WebAuthnErrorDetails } from '../../../interfaces/common';
import type { MfaWebAuthnRoamingEnrollmentMembers, ShowErrorOptions, TryAnotherMethodOptions, ScreenMembersOnMfaWebAuthnRoamingEnrollment as ScreenOptions } from '../../../interfaces/screens/mfa-webauthn-roaming-enrollment';
/**
 * Class implementing the mfa-webauthn-roaming-enrollment screen functionality.
 * This screen is displayed when a user needs to enroll a WebAuthn roaming authenticator (like a security key).
 */
export default class MfaWebAuthnRoamingEnrollment extends BaseContext implements MfaWebAuthnRoamingEnrollmentMembers {
    static screenIdentifier: string;
    screen: ScreenOptions;
    /**
     * Creates an instance of MfaWebAuthnRoamingEnrollment screen manager.
     */
    constructor();
    /**
     * Initiates the WebAuthn credential creation and submits the result to the server.
     * This corresponds to the user interacting with the FIDO Security Keys prompt.
     * @param payload Optional custom options to include with the request.
     * @example
     * ```typescript
     * import MfaWebAuthnRoamingEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';
     *
     * const webauthnEnrollment = new MfaWebAuthnRoamingEnrollment();
     * // Assuming you have obtained the WebAuthn credential response (e.g., from navigator.credentials.create)
     * const credentialResponse = { /* ... serialized credential ... *&#x2F; };
     * await webauthnEnrollment.enroll({ response: JSON.stringify(credentialResponse) });
     * ```
     */
    enroll(payload: CustomOptions): Promise<void>;
    /**
     * Submits details about a WebAuthn browser error to the server.
     * This is used when the browser's WebAuthn API encounters an error.
     * @param payload The options containing the error details.
     * @example
     * ```typescript
     * import MfaWebAuthnRoamingEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';
     *
     * const webauthnEnrollment = new MfaWebAuthnRoamingEnrollment();
     * await webauthnEnrollment.showError({
     *   error: {
     *     name: 'NotAllowedError',
     *     message: 'The operation either timed out or was not allowed.',
     *   },
     * });
     * ```
     */
    showError(payload: ShowErrorOptions): Promise<void>;
    /**
     * Allows the user to try another MFA method.
     * This corresponds to the "Try Another Method" button.
     * @param payload Optional custom options to include with the request.
     * @example
     * ```typescript
     * import MfaWebAuthnRoamingEnrollment from '@auth0/auth0-acul-js/mfa-webauthn-roaming-enrollment';
     *
     * const webauthnEnrollment = new MfaWebAuthnRoamingEnrollment();
     * await webauthnEnrollment.tryAnotherMethod();
     * ```
     */
    tryAnotherMethod(payload?: TryAnotherMethodOptions): Promise<void>;
}
export { MfaWebAuthnRoamingEnrollmentMembers, ShowErrorOptions, TryAnotherMethodOptions, ScreenOptions as ScreenMembersOnMfaWebAuthnRoamingEnrollment, WebAuthnErrorDetails, };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map