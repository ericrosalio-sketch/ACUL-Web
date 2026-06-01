import { Screen } from '../../models/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnDeviceCodeConfirmation as OverrideOptions } from '../../../interfaces/screens/device-code-confirmation';
export declare class ScreenOverride extends Screen implements OverrideOptions {
    data: OverrideOptions['data'];
    constructor(screenContext: ScreenContext);
    /**
     * Extracts and transforms the screen data from the context
     * @param screenContext The screen context containing the data
     * @returns The transformed screen data
     */
    static getScreenData: (screenContext: ScreenContext) => OverrideOptions["data"];
}
//# sourceMappingURL=screen-override.d.ts.map