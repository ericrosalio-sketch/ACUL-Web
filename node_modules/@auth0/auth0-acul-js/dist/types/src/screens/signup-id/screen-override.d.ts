import { Screen } from '../../models/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnSignupId as OverrideOptions } from '../../../interfaces/screens/signup-id';
export declare class ScreenOverride extends Screen implements OverrideOptions {
    loginLink: OverrideOptions['loginLink'];
    constructor(screenContext: ScreenContext);
}
//# sourceMappingURL=screen-override.d.ts.map