import { Screen } from '../../models/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnPhoneIdentifierEnrollment as OverrideOptions } from '../../../interfaces/screens/phone-identifier-enrollment';
export declare class ScreenOverride extends Screen implements OverrideOptions {
    editIdentifierLink: OverrideOptions['editIdentifierLink'];
    data: OverrideOptions['data'];
    constructor(screenContext: ScreenContext);
    static getScreenData(screenContext: ScreenContext): OverrideOptions['data'];
}
//# sourceMappingURL=screen-override.d.ts.map