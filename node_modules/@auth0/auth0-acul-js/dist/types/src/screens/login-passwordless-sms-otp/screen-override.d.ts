import { Screen } from '../../models/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnLoginPasswordlessSmsOtp as OverrideOptions } from '../../../interfaces/screens/login-passwordless-sms-otp';
export declare class ScreenOverride extends Screen implements OverrideOptions {
    signupLink: OverrideOptions['signupLink'];
    resetPasswordLink: OverrideOptions['resetPasswordLink'];
    backLink: OverrideOptions['backLink'];
    data: OverrideOptions['data'];
    constructor(screenContext: ScreenContext);
}
//# sourceMappingURL=screen-override.d.ts.map