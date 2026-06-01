/**
 * @file Implements the functionality for the MFA Phone Challenge screen (mfa-phone-challenge).
 * This screen allows users to choose between receiving an MFA code via SMS or a voice call.
 */
import { BaseContext } from '../../models/base-context';
import type { MfaPhoneChallengeMembers, ScreenMembersOnMfaPhoneChallenge as ScreenOptions, ContinueOptions, PickPhoneOptions, PickAuthenticatorOptions } from '../../../interfaces/screens/mfa-phone-challenge';
/**
 * @class MfaPhoneChallenge
 * @extends {BaseContext}
 * Manages the interactions and state for the MFA Phone Challenge screen.
 * Allows users to select SMS or voice call for verification and provides options to pick another phone or authenticator.
 */
export default class MfaPhoneChallenge extends BaseContext implements MfaPhoneChallengeMembers {
    /**
     * The unique identifier for this screen.
     */
    static screenIdentifier: string;
    /**
     * Holds the specific screen data for the MFA Phone Challenge.
     */
    screen: ScreenOptions;
    /**
     * Initializes a new instance of the `MfaPhoneChallenge` class.
     * It sets up the screen-specific data by creating an instance of `ScreenOverride`.
     */
    constructor();
    /**
     * Submits the user's choice of receiving the MFA code via SMS or voice call.
     * It uses the phone number provided in the screen context.
     *
     * @param {ContinueOptions} payload - Options containing the delivery type ('sms' or 'voice').
     * @returns {Promise<void>} A promise that resolves upon successful submission.
     * @throws {Error} Throws an error if the phone number is not available in the screen context or if the submission fails.
     * @example
     * ```typescript
     * const mfaPhoneChallenge = new MfaPhoneChallenge();
     * // Request code via SMS
     * await mfaPhoneChallenge.continue({ type: 'sms' });
     * // Request code via Voice Call
     * await mfaPhoneChallenge.continue({ type: 'voice' });
     * ```
     */
    continue(payload: ContinueOptions): Promise<void>;
    /**
     * Initiates the process for the user to select a different phone number (if applicable).
     * This typically triggers a navigation to a phone selection screen.
     *
     * @param {PickPhoneOptions} [payload] - Optional custom options for the request.
     * @returns {Promise<void>} A promise that resolves upon successful submission.
     * @throws {Error} Throws an error if the submission fails.
     * @example
     * ```typescript
     * const mfaPhoneChallenge = new MfaPhoneChallenge();
     * await mfaPhoneChallenge.pickPhone();
     * ```
     */
    pickPhone(payload?: PickPhoneOptions): Promise<void>;
    /**
     * Allows the user to choose a different MFA method (e.g., OTP, Recovery Code).
     * This typically triggers navigation to the authenticator selection screen.
     *
     * @param {PickAuthenticatorOptions} [payload] - Optional custom options for the request.
     * @returns {Promise<void>} A promise that resolves upon successful submission.
     * @throws {Error} Throws an error if the submission fails.
     * @example
     * ```typescript
     * const mfaPhoneChallenge = new MfaPhoneChallenge();
     * await mfaPhoneChallenge.tryAnotherMethod();
     * ```
     */
    tryAnotherMethod(payload?: PickAuthenticatorOptions): Promise<void>;
}
export { MfaPhoneChallengeMembers, ScreenOptions as ScreenMembersOnMfaPhoneChallenge, ContinueOptions, PickPhoneOptions, PickAuthenticatorOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map