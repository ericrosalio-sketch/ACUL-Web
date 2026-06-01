import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { MfaSmsEnrollmentMembers, MfaSmsEnrollmentOptions, ScreenMembersOnMfaSmsEnrollment } from '../../../interfaces/screens/mfa-sms-enrollment';
/**
 * Represents the MFA SMS Enrollment screen.
 */
export default class MfaSmsEnrollment extends BaseContext implements MfaSmsEnrollmentMembers {
    static screenIdentifier: string;
    screen: ScreenMembersOnMfaSmsEnrollment;
    /**
     * Initializes a new instance of the MfaSmsEnrollment class.
     */
    constructor();
    /**
     * Handles the action to pick a country code for SMS enrollment.
     * @param payload Optional custom options to include in the request.
     * @returns A promise that resolves when the action is complete.
     * @example
     * ```typescript
     * import MfaSmsEnrollment from '@auth0/auth0-acul-js/mfa-sms-enrollment';
     *
     * const mfaSmsEnrollment = new MfaSmsEnrollment();
     * await mfaSmsEnrollment.pickCountryCode();
     * ```
     */
    pickCountryCode(payload?: CustomOptions): Promise<void>;
    /**
     * Continues the SMS enrollment process with the provided phone number.
     * @param payload The phone number to use for enrollment.
     * @returns A promise that resolves when the enrollment process is complete.
     * @throws {Error} If the phone number is missing.
     * @example
     * ```typescript
     * import MfaSmsEnrollment from '@auth0/auth0-acul-js/mfa-sms-enrollment';
     *
     * const mfaSmsEnrollment = new MfaSmsEnrollment();
     * await mfaSmsEnrollment.continueEnrollment({ phone: '1234567890' });
     * ```
     */
    continueEnrollment(payload: MfaSmsEnrollmentOptions): Promise<void>;
    /**
     * Handles the action to try another method for MFA.
     * @param payload Optional custom options to include in the request.
     * @returns A promise that resolves when the action is complete.
     * @example
     * ```typescript
     * import MfaSmsEnrollment from '@auth0/auth0-acul-js/mfa-sms-enrollment';
     *
     * const mfaSmsEnrollment = new MfaSmsEnrollment();
     * await mfaSmsEnrollment.tryAnotherMethod();
     * ```
     */
    tryAnotherMethod(payload?: CustomOptions): Promise<void>;
}
export { MfaSmsEnrollmentMembers, MfaSmsEnrollmentOptions, ScreenMembersOnMfaSmsEnrollment };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map