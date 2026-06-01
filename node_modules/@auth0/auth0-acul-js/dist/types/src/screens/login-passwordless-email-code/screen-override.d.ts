import { Screen } from '../../models/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnLoginPasswordlessEmailCode as OverrideOptions } from '../../../interfaces/screens/login-passwordless-email-code';
export declare class ScreenOverride extends Screen implements OverrideOptions {
    signupLink: OverrideOptions['signupLink'];
    resetPasswordLink: OverrideOptions['resetPasswordLink'];
    editIdentifierLink: OverrideOptions['editIdentifierLink'];
    data: OverrideOptions['data'];
    constructor(screenContext: ScreenContext);
}
//# sourceMappingURL=screen-override.d.ts.map