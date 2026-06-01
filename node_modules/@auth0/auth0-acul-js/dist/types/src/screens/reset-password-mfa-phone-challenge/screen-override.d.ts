import { Screen } from '../../models/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnResetPasswordMfaPhoneChallenge as OverrideOptions } from '../../../interfaces/screens/reset-password-mfa-phone-challenge';
/**
 * @class ScreenOverride
 * @extends {Screen}
 * @implements {OverrideOptions}
 * Provides specific data accessors for the 'reset-password-mfa-phone-challenge' screen context.
 * It extracts and makes the target phone number easily accessible.
 */
export declare class ScreenOverride extends Screen implements OverrideOptions {
    /**
     * @property {object | null} data - Screen-specific data.
     * @property {string} data.phoneNumber - The phone number associated with this MFA challenge.
     */
    data: OverrideOptions['data'];
    /**
     * Initializes a new instance of the `ScreenOverride` class for the 'reset-password-mfa-phone-challenge' screen.
     * Parses the screen context to extract the phone number.
     * @param {ScreenContext} screenContext - The screen context provided by Universal Login.
     */
    constructor(screenContext: ScreenContext);
    /**
     * @static
     * @method getScreenData
     * Extracts and transforms the screen-specific data from the provided screen context.
     * Specifically targets the `phone_number` property from the raw context data.
     *
     * @param {ScreenContext} screenContext - The screen context containing the raw data.
     * @returns {OverrideOptions['data']} The structured screen data containing the `phoneNumber`,
     * or `null` if the required `phone_number` data is not present or not a string in the context.
     */
    static getScreenData: (screenContext: ScreenContext) => OverrideOptions["data"];
}
//# sourceMappingURL=screen-override.d.ts.map