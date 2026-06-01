import { Screen } from '../../models/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnSignup as OverrideOptions } from '../../../interfaces/screens/signup';
export declare class ScreenOverride extends Screen implements OverrideOptions {
    loginLink: OverrideOptions['loginLink'];
    constructor(screenContext: ScreenContext);
}
//# sourceMappingURL=screen-override.d.ts.map