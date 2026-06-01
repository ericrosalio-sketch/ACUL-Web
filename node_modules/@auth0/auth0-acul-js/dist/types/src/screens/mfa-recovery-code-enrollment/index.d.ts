import { BaseContext } from '../../models/base-context';
import type { MfaRecoveryCodeEnrollmentContinueOptions, MfaRecoveryCodeEnrollmentMembers, ScreenMembersOnMfaRecoveryCodeEnrollment } from '../../../interfaces/screens/mfa-recovery-code-enrollment';
/**
 * Class implementing the Mfa Recovery Code Enrollment screen functionality.
 * This screen is displayed when the user needs to enroll with a recovery code for MFA.
 */
export default class MfaRecoveryCodeEnrollment extends BaseContext implements MfaRecoveryCodeEnrollmentMembers {
    static screenIdentifier: string;
    screen: ScreenMembersOnMfaRecoveryCodeEnrollment;
    /**
     * Creates an instance of the MfaRecoveryCodeEnrollment screen.
     */
    constructor();
    /**
     * Declares that the user saved the recovery code.
     * This action is triggered when the user declares that they have saved the recovery code.
     * It redirects to the next screen in the authentication flow.
     *
     * @param {object} payload - An object containing any custom options.
     *
     * @returns {Promise<void>} A promise that resolves when the action is successfully submitted.
     * @example
     * ```typescript
     * import MfaRecoveryCodeEnrollment from '@auth0/auth0-acul-js/mfa-recovery-code-enrollment';
     * const mfaRecoveryCodeEnrollmentManager = new MfaRecoveryCodeEnrollment();
     * const continueEnrollment = async (payload) => {
     *  try {
     *    await mfaRecoveryCodeEnrollmentManager.continue(payload);
     *    console.log('Enrollment continued successfully.');
     *  } catch (error) {
     *    console.error('Error continuing enrollment:', error);
     *  }
     * };
     * ```
     * Rejects with an error if the submission fails.
     */
    continue(payload: MfaRecoveryCodeEnrollmentContinueOptions): Promise<void>;
}
export { MfaRecoveryCodeEnrollmentMembers, ScreenMembersOnMfaRecoveryCodeEnrollment, MfaRecoveryCodeEnrollmentContinueOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map