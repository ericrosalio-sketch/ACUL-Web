import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { ResetPasswordEmailMembers, ResetPasswordEmailOptions, ScreenMembersOnResetPasswordEmail as ScreenOptions } from '../../../interfaces/screens/reset-password-email';
export default class ResetPasswordEmail extends BaseContext implements ResetPasswordEmailMembers {
    static screenIdentifier: string;
    screen: ScreenOptions;
    constructor();
    /**
     * @example
     * import ResetPasswordEmail from '@auth0/auth0-acul-js/reset-password-email';
     *
     * const resetPasswordEmail = new ResetPasswordEmail();
     * resetPasswordEmail.resendEmail();
     */
    resendEmail(payload?: CustomOptions): Promise<void>;
}
export { ResetPasswordEmailMembers, ResetPasswordEmailOptions, ScreenOptions as ScreenMembersOnResetPasswordEmail };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map