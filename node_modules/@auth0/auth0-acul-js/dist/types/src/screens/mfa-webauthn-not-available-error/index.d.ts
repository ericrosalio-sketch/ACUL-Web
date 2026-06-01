import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { MfaWebAuthnNotAvailableErrorMembers } from '../../../interfaces/screens/mfa-webauthn-not-available-error';
/**
 * @class MfaWebAuthnNotAvailableError
 * @extends BaseContext
 * implements MfaWebAuthnNotAvailableErrorMembers
 * description Manages interactions for the 'mfa-webauthn-not-available-error' screen.
 * This screen is displayed if a user attempts to use WebAuthn for MFA but their browser/device
 * does not support it or no compatible authenticator is found. The primary action is to allow
 * the user to select an alternative MFA method.
 */
export default class MfaWebAuthnNotAvailableError extends BaseContext implements MfaWebAuthnNotAvailableErrorMembers {
    /**
     * static
     * @property {string} screenIdentifier - The unique identifier for the 'mfa-webauthn-not-available-error' screen.
     */
    static screenIdentifier: string;
    /**
     * Initializes a new instance of the `MfaWebAuthnNotAvailableError` class.
     * It retrieves the necessary context (screen, transaction, etc.) from the global `universal_login_context`.
     * @throws {Error} If the Universal Login Context is not available or if the screen name in the context
     * does not match `MfaWebAuthnNotAvailableError.screenIdentifier`.
     */
    constructor();
    /**
     * Allows the user to select a different Multi-Factor Authentication method because WebAuthn
     * is not available or supported on their current device/browser.
     * This action navigates the user to a screen where they can choose from other available/enrolled MFA factors.
     *
     * @param {CustomOptions} [payload] - Optional custom parameters to be sent with the request.
     * @returns {Promise<void>} A promise that resolves upon successful submission of the 'pick-authenticator' action.
     * @throws {Error} Throws an error if the form submission fails (e.g., network issues, server-side validation errors).
     * @example
     * ```typescript
     * // Assuming 'sdk' is an instance of MfaWebAuthnNotAvailableError
     * try {
     *   await sdk.tryAnotherMethod();
     *   // On success, Auth0 typically handles redirection to the MFA factor selection screen.
     * } catch (error) {
     *   console.error('Failed to initiate "try another method":', error);
     *   // Update UI to inform the user about the failure to switch methods.
     * }
     * ```
     */
    tryAnotherMethod(payload?: CustomOptions): Promise<void>;
}
export { MfaWebAuthnNotAvailableErrorMembers };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map