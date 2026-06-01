import { Screen } from '../../../src/models/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnLoginId as OverrideOptions } from '../../../interfaces/screens/login-id';
export declare class ScreenOverride extends Screen implements OverrideOptions {
    signupLink: OverrideOptions['signupLink'];
    resetPasswordLink: OverrideOptions['resetPasswordLink'];
    publicKey: OverrideOptions['publicKey'];
    constructor(screenContext: ScreenContext);
}
//# sourceMappingURL=screen-override.d.ts.map