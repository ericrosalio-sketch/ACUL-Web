import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { PasskeyEnrollmentMembers, ScreenMembersOnPasskeyEnrollment as ScreenOptions } from '../../../interfaces/screens/passkey-enrollment';
export default class PasskeyEnrollment extends BaseContext implements PasskeyEnrollmentMembers {
    static screenIdentifier: string;
    screen: ScreenOptions;
    constructor();
    /**
     * @example
     * import PasskeyEnrollment from '@auth0/auth0-acul-js/passkey-enrollment';
     *
     * const passkeyEnrollment = new PasskeyEnrollment();
     * passkeyEnrollment.continuePasskeyEnrollment();
     */
    continuePasskeyEnrollment(payload?: CustomOptions): Promise<void>;
    /**
     * @example
     * import PasskeyEnrollment from '@auth0/auth0-acul-js/passkey-enrollment';
     *
     * const passkeyEnrollment = new PasskeyEnrollment();
     * passkeyEnrollment.abortPasskeyEnrollment();
     */
    abortPasskeyEnrollment(payload?: CustomOptions): Promise<void>;
}
export { PasskeyEnrollmentMembers, ScreenOptions as ScreenMembersOnPasskeyEnrollment };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map