import { BaseContext } from '../../models/base-context';
import type { MfaOtpChallengeMembers, ContinueOptions, TryAnotherMethodOptions, ScreenMembersOnMfaOtpChallenge as ScreenOptions, UntrustedDataMembersOnMfaOtpChallenge as UntrustedDataOptions } from '../../../interfaces/screens/mfa-otp-challenge';
/**
 * Class implementing the mfa-otp-challenge screen functionality
 * This screen is shown when a user needs to enter an OTP code during MFA
 */
export default class MfaOtpChallenge extends BaseContext implements MfaOtpChallengeMembers {
    static screenIdentifier: string;
    screen: ScreenOptions;
    untrustedData: UntrustedDataOptions;
    /**
     * Creates an instance of MfaOtpChallenge screen manager
     */
    constructor();
    /**
     * Continues with the OTP challenge using the provided code
     * @param payload The options containing the code and rememberDevice flag
     * @example
     * ```typescript
     * import MfaOtpChallenge from '@auth0/auth0-acul-js/mfa-otp-challenge';
     *
     * const mfaOtpChallenge = new MfaOtpChallenge();
     * await mfaOtpChallenge.continue({
     *   code: '123456',
     *   rememberDevice: true
     * });
     * ```
     */
    continue(payload: ContinueOptions): Promise<void>;
    /**
     * Allows the user to try another MFA method
     * @param payload Optional custom options to include with the request
     * @example
     * ```typescript
     * import MfaOtpChallenge from '@auth0/auth0-acul-js/mfa-otp-challenge';
     *
     * const mfaOtpChallenge = new MfaOtpChallenge();
     * await mfaOtpChallenge.tryAnotherMethod();
     * ```
     */
    tryAnotherMethod(payload?: TryAnotherMethodOptions): Promise<void>;
}
export { MfaOtpChallengeMembers, ContinueOptions, TryAnotherMethodOptions, ScreenOptions as ScreenMembersOnMfaOtpChallenge, UntrustedDataOptions as UntrustedDataMembersOnMfaOtpChallenge, };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map