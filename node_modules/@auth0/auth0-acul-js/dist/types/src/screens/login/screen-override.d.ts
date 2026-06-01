import { Screen } from '../../models/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnLogin as OverrideOptions } from '../../../interfaces/screens/login';
/**
 * Login screen override implementation
 */
export declare class ScreenOverride extends Screen implements OverrideOptions {
    signupLink: OverrideOptions['signupLink'];
    resetPasswordLink: OverrideOptions['resetPasswordLink'];
    data: OverrideOptions['data'];
    constructor(screenContext: ScreenContext);
}
//# sourceMappingURL=screen-override.d.ts.map