import { BaseContext } from '../../models/base-context';
import type { ResetPasswordErrorMembers, ScreenMembersOnResetPasswordError as ScreenOptions } from '../../../interfaces/screens/reset-password-error';
export default class ResetPasswordError extends BaseContext implements ResetPasswordErrorMembers {
    static screenIdentifier: string;
    screen: ScreenOptions;
    constructor();
}
export { ResetPasswordErrorMembers, ScreenOptions as ScreenMembersOnResetPasswordError };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map