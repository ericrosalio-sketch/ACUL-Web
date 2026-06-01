import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { MfaWebAuthnPlatformEnrollmentMembers, ScreenMembersOnMfaWebAuthnPlatformEnrollment as ScreenOptions, SubmitPasskeyCredentialOptions, // Though this interface will now be just CustomOptions effectively
ReportBrowserErrorOptions } from '../../../interfaces/screens/mfa-webauthn-platform-enrollment';
/**
 * @class MfaWebAuthnPlatformEnrollment
 * @extends BaseContext
 * implements MfaWebAuthnPlatformEnrollmentMembers
 * description Manages interactions for the MFA WebAuthn Platform Enrollment screen.
 * This screen guides the user through enrolling a platform authenticator (like Touch ID, Windows Hello)
 * as a Multi-Factor Authentication method. It handles the creation and submission of the WebAuthn credential
 * or reports browser-side errors. It also allows users to snooze the enrollment or refuse to enroll.
 */
export default class MfaWebAuthnPlatformEnrollment extends BaseContext implements MfaWebAuthnPlatformEnrollmentMembers {
    /**
     * static
     * @property {string} screenIdentifier - The unique identifier for the 'mfa-webauthn-platform-enrollment' screen.
     */
    static screenIdentifier: string;
    /**
     * @property {ScreenOptions} screen - Holds the specific screen data and properties,
     * processed by `ScreenOverride` for the MFA WebAuthn Platform Enrollment screen.
     * This includes convenient access to `screen.publicKey`.
     */
    screen: ScreenOptions;
    /**
     * Initializes a new instance of the `MfaWebAuthnPlatformEnrollment` class.
     * @throws {Error} If the Universal Login Context is not available or if the screen name
     * in the context does not match `MfaWebAuthnPlatformEnrollment.screenIdentifier`.
     */
    constructor();
    /**
     * Initiates the WebAuthn platform credential creation process using the public key options
     * available on `this.screen.publicKey` and submits the resulting credential to the server.
     * This method internally calls `createPasskeyCredentials` (which wraps `navigator.credentials.create()`).
     *
     * @param {SubmitPasskeyCredentialOptions} [payload] - Optional custom parameters to be sent to the server
     * along with the created credential.
     * @returns {Promise<void>} A promise that resolves when the credential is successfully created and submitted.
     * @throws {Error} Throws an error if `this.screen.publicKey` is not available, if `createPasskeyCredentials` fails
     * (e.g., user cancellation, hardware issues), or if the submission to the server fails.
     * @example
     * ```typescript
     * // Assuming 'sdk' is an instance of MfaWebAuthnPlatformEnrollment
     * try {
     *   await sdk.submitPasskeyCredential(); // No need to pass publicKey explicitly
     *   // On success, Auth0 handles redirection.
     * } catch (error) {
     *   console.error('Passkey enrollment failed:', error);
     *   if (error.name && error.message) { // Check if it looks like a WebAuthn error
     *     await sdk.reportBrowserError({ error: { name: error.name, message: error.message } });
     *   }
     * }
     * ```
     */
    submitPasskeyCredential(payload?: SubmitPasskeyCredentialOptions): Promise<void>;
    /**
     * Reports a browser-side error encountered during the WebAuthn `navigator.credentials.create()` operation.
     *
     * @param {ReportBrowserErrorOptions} payload - An object containing the `error` (with `name` and `message` properties
     * from the browser's WebAuthn API error) and any other custom options.
     * @returns {Promise<void>} A promise that resolves upon successful submission of the error report.
     * @throws {Error} Throws an error if the form submission fails.
     */
    reportBrowserError(payload: ReportBrowserErrorOptions): Promise<void>;
    /**
     * Allows the user to choose to snooze the WebAuthn platform enrollment.
     *
     * @param {CustomOptions} [payload] - Optional custom parameters to be sent with the request.
     * @returns {Promise<void>} A promise that resolves upon successful submission of the snooze action.
     */
    snoozeEnrollment(payload?: CustomOptions): Promise<void>;
    /**
     * Allows the user to refuse WebAuthn platform enrollment on the current device.
     *
     * @param {CustomOptions} [payload] - Optional custom parameters to be sent with the request.
     * @returns {Promise<void>} A promise that resolves upon successful submission of the refusal action.
     */
    refuseEnrollmentOnThisDevice(payload?: CustomOptions): Promise<void>;
}
export { MfaWebAuthnPlatformEnrollmentMembers, ScreenOptions as ScreenMembersOnMfaWebAuthnPlatformEnrollment, SubmitPasskeyCredentialOptions, ReportBrowserErrorOptions, };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map