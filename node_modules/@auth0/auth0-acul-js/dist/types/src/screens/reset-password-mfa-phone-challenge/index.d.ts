import { BaseContext } from '../../models/base-context';
import type { ResetPasswordMfaPhoneChallengeMembers, ScreenMembersOnResetPasswordMfaPhoneChallenge as ScreenOptions, ContinueOptions, TryAnotherMethodOptions } from '../../../interfaces/screens/reset-password-mfa-phone-challenge';
/**
 * @class ResetPasswordMfaPhoneChallenge
 * @extends {BaseContext}
 * Manages the interactions and state for the Reset Password MFA Phone Challenge screen.
 * It allows triggering the sending of verification codes via SMS or voice call and
 * provides functionality to switch to a different MFA method.
 */
export default class ResetPasswordMfaPhoneChallenge extends BaseContext implements ResetPasswordMfaPhoneChallengeMembers {
    /**
     * The unique identifier for this screen, used internally and for telemetry.
     * @type {string}
     */
    static screenIdentifier: string;
    /**
     * Holds the specific screen data and properties, processed by ScreenOverride.
     * @type {ScreenOptions}
     */
    screen: ScreenOptions;
    /**
     * Initializes a new instance of the `ResetPasswordMfaPhoneChallenge` class.
     * It retrieves the screen context and sets up the screen-specific properties.
     * @throws {Error} If the Universal Login Context is not available or if the screen name doesn't match.
     */
    constructor();
    /**
     * Sends the verification code to the user's phone via the selected method (SMS or Voice).
     * Corresponds to the 'Continue' action in the OpenAPI definition (action: 'default').
     *
     * @param {ContinueOptions} payload - Contains the delivery type (`sms` or `voice`) and any optional custom data.
     * @returns {Promise<void>} A promise resolving upon successful submission to the server.
     * @throws {Error} If the form submission fails.
     * @example
     * ```typescript
     * const screen = new ResetPasswordMfaPhoneChallenge();
     * try {
     *   await screen.continue({ type: 'sms' });
     *   // Redirects to code entry screen on success
     * } catch (error) {
     *   console.error("Failed to send SMS code:", error);
     * }
     * ```
     */
    continue(payload: ContinueOptions): Promise<void>;
    /**
     * Initiates the process for the user to select a different MFA authenticator.
     * Corresponds to the 'Try Another Method' action in the OpenAPI definition (action: 'pick-authenticator').
     *
     * @param {TryAnotherMethodOptions} payload - Contains the *current* challenge type (`sms` or `voice`) as required by the API, and any optional custom data.
     * @returns {Promise<void>} A promise resolving upon successful submission to the server.
     * @throws {Error} If the form submission fails.
     * @example
     * ```typescript
     * const screen = new ResetPasswordMfaPhoneChallenge();
     * try {
     *   // Assuming the current screen was for SMS
     *   await screen.tryAnotherMethod({ type: 'sms' });
     *   // Redirects to authenticator selection screen on success
     * } catch (error) {
     *   console.error("Failed to switch MFA method:", error);
     * }
     * ```
     */
    tryAnotherMethod(payload: TryAnotherMethodOptions): Promise<void>;
}
export { ResetPasswordMfaPhoneChallengeMembers, ScreenOptions as ScreenMembersOnResetPasswordMfaPhoneChallenge, ContinueOptions, TryAnotherMethodOptions, };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map