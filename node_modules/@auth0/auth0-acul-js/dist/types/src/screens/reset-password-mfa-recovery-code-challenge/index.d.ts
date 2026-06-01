import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { ResetPasswordMfaRecoveryCodeChallengeMembers } from '../../../interfaces/screens/reset-password-mfa-recovery-code-challenge';
/**
 * Class implementing the Reset Password MFA Recovery Code Challenge screen functionality.
 */
export default class ResetPasswordMfaRecoveryCodeChallenge extends BaseContext implements ResetPasswordMfaRecoveryCodeChallengeMembers {
    static screenIdentifier: string;
    /**
     * Creates an instance of the ResetPasswordMfaRecoveryCodeChallenge screen.
     */
    constructor();
    /**
     * Continues with the provided recovery code.
     * @param {string} code - The recovery code entered by the user.
     * @param {CustomOptions} [payload] - Optional payload.
     * @returns {Promise<void>}
     * @example
     * ```typescript
     * import ResetPasswordMfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge';
     * const resetPasswordMfaManager = new ResetPasswordMfaRecoveryCodeChallenge();
     * const continueWithRecoveryCode = async () => {
     *  try {
     *    await resetPasswordMfaManager.continue('RECOVERY_CODE');
     *     console.log('Recovery code submitted successfully.');
     *  } catch (error) {
     *    console.error('Error submitting recovery code:', error);
     *  }
     * };
     * ```
     */
    continue(code: string, payload?: CustomOptions): Promise<void>;
    /**
     * Navigates to the screen where the user can pick another MFA method.
     * @param {CustomOptions} [payload] - Optional payload.
     * @returns {Promise<void>}
     * @example
     * ```typescript
     * import ResetPasswordMfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/reset-password-mfa-recovery-code-challenge';
     * const resetPasswordMfaRecoveryCodeChallengeManager = new ResetPasswordMfaRecoveryCodeChallenge();
     * const handleTryAnotherMethod = async () => {
     *  try {
     *    await resetPasswordMfaRecoveryCodeChallengeManager.tryAnotherMethod();
     *  } catch (error) {
     *    console.error('Failed to try another method:', error);
     *  }
     * };
     * ```
     */
    tryAnotherMethod(payload?: CustomOptions): Promise<void>;
}
export { ResetPasswordMfaRecoveryCodeChallengeMembers };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map