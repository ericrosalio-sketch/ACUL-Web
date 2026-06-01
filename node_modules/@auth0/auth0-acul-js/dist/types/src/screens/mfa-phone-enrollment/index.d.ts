import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { MfaPhoneEnrollmentMembers, ContinueOptions } from '../../../interfaces/screens/mfa-phone-enrollment';
/**
 * Class implementing the mfa-phone-enrollment screen functionality.
 * This screen allows users to enroll using a phone number for MFA.
 */
export default class MfaPhoneEnrollment extends BaseContext implements MfaPhoneEnrollmentMembers {
    static screenIdentifier: string;
    /**
     * Creates an instance of the MfaPhoneEnrollment screen.
     */
    constructor();
    /**
     * Navigates to the country code selection screen.
     * @param payload Optional custom options to include with the request.
     * @example
     * ```typescript
     * import MfaPhoneEnrollment from '@auth0/auth0-acul-js/mfa-phone-enrollment';
     * const mfaPhoneEnrollmentManager = new MfaPhoneEnrollment();
     * async function handlePickCountryCode() {
     *  try {
     *    await mfaPhoneEnrollmentManager.pickCountryCode();
     *    console.log('Country code selection successful.');
     *  } catch (error) {
     *    console.error('Error selecting country code:', error);
     *  }
     * }
     */
    pickCountryCode(payload?: CustomOptions): Promise<void>;
    /**
     * Continues the enrollment process with the provided phone number and type (SMS or voice).
     * @param payload The phone number and type (SMS or voice).
     * @example
     * ```typescript
     * import MfaPhoneEnrollment from '@auth0/auth0-acul-js/mfa-phone-enrollment';
     * const mfaPhoneEnrollmentManager = new MfaPhoneEnrollment();
     * async function handleContinueEnrollment() {
     *  try {
     *    await mfaPhoneEnrollmentManager.continueEnrollment({
     *      phone: '+1234567890',
     *      type: 'sms', // or 'voice'
     *    });
     *    console.log('Phone enrollment continued successfully.');
     *  } catch (error) {
     *    console.error('Error continuing phone enrollment:', error);
     *  }
     * }
     * ```
     */
    continueEnrollment(payload: ContinueOptions): Promise<void>;
    /**
     * Allows the user to try another MFA method.
     * @param payload Optional custom options to include with the request.
     * @example
     * ```typescript
     * import MfaPhoneEnrollment from '@auth0/auth0-acul-js/mfa-phone-enrollment';
     * const mfaPhoneEnrollmentManager = new MfaPhoneEnrollment();
     * async function handleTryAnotherMethod() {
     *  try {
     *    await mfaPhoneEnrollmentManager.tryAnotherMethod();
     *    console.log('Switched to another authentication method.');
     *   } catch (error) {
     *  console.error('Error switching authenticator method:', error);
     *  }
     * }
     * ```
     */
    tryAnotherMethod(payload?: CustomOptions): Promise<void>;
}
export { MfaPhoneEnrollmentMembers, ContinueOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map