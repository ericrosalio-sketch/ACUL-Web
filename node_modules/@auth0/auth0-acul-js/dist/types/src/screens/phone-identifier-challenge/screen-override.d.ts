import { Screen } from '../../models/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnPhoneIdentifierChallenge as OverrideOptions } from '../../../interfaces/screens/phone-identifier-challenge';
export declare class ScreenOverride extends Screen implements OverrideOptions {
    data: OverrideOptions['data'];
    constructor(screenContext: ScreenContext);
    static getScreenData(screenContext: ScreenContext): OverrideOptions['data'];
}
//# sourceMappingURL=screen-override.d.ts.map