import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { MfaRecoveryCodeChallengeMembers, ContinueOptions } from '../../../interfaces/screens/mfa-recovery-code-challenge';
/**
 * Class implementing the MFA Recovery Code Challenge screen functionality.
 */
export default class MfaRecoveryCodeChallenge extends BaseContext implements MfaRecoveryCodeChallengeMembers {
    static screenIdentifier: string;
    /**
     * Creates an instance of the MfaRecoveryCodeChallenge screen.
     */
    constructor();
    /**
     * Continues with the provided recovery code.
     * @param payload - The payload containing the recovery code and optional custom options.
     * @returns {Promise<void>}
     * @example
     * ```typescript
     * import MfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';
     * const mfaRecoveryCodeChallengeManager = new MfaRecoveryCodeChallenge();
     * const handleContinueEnrollment = async () => {
     *  try {
     *    await mfaRecoveryCodeChallengeManager.continue('YOUR_RECOVERY_CODE');
     *  } catch (error) {
     *    console.error('Error continuing with recovery code:', error);
     *  }
     * }
     * ```
     */
    continue(payload: ContinueOptions): Promise<void>;
    /**
     * Navigates to the screen where the user can pick another MFA method.
     * @param payload Optional payload.
     * @returns {Promise<void>}
     * @example
     * ```typescript
     * import MfaRecoveryCodeChallenge from '@auth0/auth0-acul-js/mfa-recovery-code-challenge';
     * const mfaRecoveryCodeChallengeManager = new MfaRecoveryCodeChallenge();
     * const switchAuthenticator = async () => {
     *  try {
     *    await mfaRecoveryCodeChallengeManager.tryAnotherMethod();
     *    console.log('Switched to another authentication method.');
     *  } catch (error) {
     *    console.error('Error switching authenticator:', error);
     *  }
     * };
     * ```
     */
    tryAnotherMethod(payload?: CustomOptions): Promise<void>;
}
export { MfaRecoveryCodeChallengeMembers, ContinueOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map