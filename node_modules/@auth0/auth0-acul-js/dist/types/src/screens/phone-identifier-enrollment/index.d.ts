import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { PhoneIdentifierEnrollmentMembers, ScreenMembersOnPhoneIdentifierEnrollment as ScreenOptions, PhoneEnrollmentOptions } from '../../../interfaces/screens/phone-identifier-enrollment';
export default class PhoneIdentifierEnrollment extends BaseContext implements PhoneIdentifierEnrollmentMembers {
    static screenIdentifier: string;
    screen: ScreenOptions;
    constructor();
    /**
     * @example
     * import PhoneIdentifierEnrollment from '@auth0/auth0-acul-js/phone-identifier-enrollment';
     *
     * const phoneIdentifierEnrollment = new PhoneIdentifierEnrollment();
     * phoneIdentifierChallenge.continuePhoneEnrollment({
     *     type: "<text' | 'voice>"
     * });
     */
    continuePhoneEnrollment(payload: PhoneEnrollmentOptions): Promise<void>;
    /**
     * @example
     * import PhoneIdentifierEnrollment from '@auth0/auth0-acul-js/phone-identifier-enrollment';
     *
     * const phoneIdentifierEnrollment = new PhoneIdentifierEnrollment();
     * phoneIdentifierChallenge.returnToPrevious();
     */
    returnToPrevious(payload?: CustomOptions): Promise<void>;
}
export { PhoneIdentifierEnrollmentMembers, PhoneEnrollmentOptions, ScreenOptions as ScreenMembersOnPhoneIdentifierEnrollment };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map