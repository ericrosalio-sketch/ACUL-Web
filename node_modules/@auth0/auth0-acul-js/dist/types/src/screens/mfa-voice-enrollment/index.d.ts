import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { MfaVoiceEnrollmentMembers, ContinueOptions } from '../../../interfaces/screens/mfa-voice-enrollment';
/**
 * Class implementing the mfa-voice-enrollment screen functionality.
 */
export default class MfaVoiceEnrollment extends BaseContext implements MfaVoiceEnrollmentMembers {
    static screenIdentifier: string;
    /**
     * Creates an instance of MfaVoiceEnrollment screen manager.
     */
    constructor();
    /**
     * Continues with the default action.
     * @param  payload - Optional payload.
     * @returns {Promise<void>}
     * @example
     * ```typescript
     * import MfaVoiceEnrollment from '@auth0/auth0-acul-js/mfa-voice-enrollment';
     * const mfaVoiceEnrollmentManager = new MfaVoiceEnrollment();
     * const handleContinueEnrollment = async () => {
     *  try {
     *    await mfaVoiceEnrollmentManager.continue({
     *      phone: '+1234567890',
     *      // Add any optional CustomOptions here if needed
     *    });
     *    console.log('Voice enrollment continued successfully.');
     *  } catch (error) {
     *    console.error('Error continuing voice enrollment:', error);
     *  }
     * };
     * ```
     */
    continue(payload: ContinueOptions): Promise<void>;
    /**
     * Allows trying another authentication method
     * @param {CustomOptions} [payload] - Optional payload.
     * @example
     * ```typescript
     * import MfaVoiceEnrollment from '@auth0/auth0-acul-js/mfa-voice-enrollment';
     * const mfaVoiceEnrollment = new MfaVoiceEnrollment();
     * const handleTryAnotherMethod = async () => {
     *  await mfaVoiceEnrollment.tryAnotherMethod();
     * };
     * ```
     */
    tryAnotherMethod(payload?: CustomOptions): Promise<void>;
    /**
     * Allows picking a country code for the phone number
     * @param {CustomOptions} [payload] - Optional payload.
     * @example
     * ```typescript
     * import MfaVoiceEnrollment from '@auth0/auth0-acul-js/mfa-voice-enrollment';
     * const mfaVoiceEnrollment = new MfaVoiceEnrollment();
     * const handlePickCountryCode = async () => {
     *  await mfaVoiceEnrollment.selectPhoneCountryCode();
     * };
     * ```
     */
    selectPhoneCountryCode(payload?: CustomOptions): Promise<void>;
}
export { MfaVoiceEnrollmentMembers, ContinueOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map