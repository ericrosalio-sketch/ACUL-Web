import { Screen } from '../../models/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnResetPasswordRequest as OverrideOptions } from '../../../interfaces/screens/reset-password-request';
export declare class ScreenOverride extends Screen implements OverrideOptions {
    constructor(screenContext: ScreenContext);
    static getScreenData: (screenContext: ScreenContext) => OverrideOptions["data"];
}
//# sourceMappingURL=screen-override.d.ts.map