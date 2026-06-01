import { Screen } from '../../models/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnResetPasswordMfaSmsChallenge as OverrideOptions } from '../../../interfaces/screens/reset-password-mfa-sms-challenge';
/**
 * @class ScreenOverride
 * @classdesc This class overrides the base Screen class to provide specific functionality for the reset-password-mfa-sms-challenge screen.
 * @extends Screen
 */
export declare class ScreenOverride extends Screen implements OverrideOptions {
    data: OverrideOptions['data'];
    /**
     * @constructor
     * @param {ScreenContext} screenContext - The screen context from the Universal Login context.
     */
    constructor(screenContext: ScreenContext);
    /**
     * @static
     * @method getScreenData
     * @description Extracts and transforms the screen data from the screen context.
     * @param {ScreenContext} screenContext - The screen context from the Universal Login context.
     * @returns {OverrideOptions['data']}
     */
    static getScreenData: (screenContext: ScreenContext) => OverrideOptions["data"];
}
//# sourceMappingURL=screen-override.d.ts.map