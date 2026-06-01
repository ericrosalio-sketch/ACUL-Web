import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { PasskeyEnrollmentLocalMembers, ScreenMembersOnPasskeyEnrollmentLocal as ScreenOptions, AbortEnrollmentOptions } from '../../../interfaces/screens/passkey-enrollment-local';
export default class PasskeyEnrollmentLocal extends BaseContext implements PasskeyEnrollmentLocalMembers {
    static screenIdentifier: string;
    screen: ScreenOptions;
    constructor();
    /**
     * @example
     * import PasskeyEnrollmentLocal from '@auth0/auth0-acul-js/passkey-enrollment-local';
     *
     * const passkeyEnrollment = new PasskeyEnrollmentLocal();
     * passkeyEnrollment.continuePasskeyEnrollment();
     */
    continuePasskeyEnrollment(payload?: CustomOptions): Promise<void>;
    /**
     * @example
     * import PasskeyEnrollmentLocal from '@auth0/auth0-acul-js/passkey-enrollment-local';
     *
     * const passkeyEnrollment = new PasskeyEnrollmentLocal();
     * passkeyEnrollment.abortPasskeyEnrollment({
     *     doNotShowAgain: <boolean>
     * });
     */
    abortPasskeyEnrollment(payload: AbortEnrollmentOptions): Promise<void>;
}
export { PasskeyEnrollmentLocalMembers, AbortEnrollmentOptions, ScreenOptions as ScreenMembersOnPasskeyEnrollmentLocal };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map