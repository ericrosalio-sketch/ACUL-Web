/**
 * @file Defines the screen override class for the MFA Phone Challenge screen.
 * This class parses and provides access to screen-specific data like the phone number.
 */
import { Screen } from '../../models/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaPhoneChallenge as OverrideOptions } from '../../../interfaces/screens/mfa-phone-challenge';
/**
 * @class ScreenOverride
 * @extends {Screen}
 * @implements {OverrideOptions}
 * Provides specific data accessors for the MFA Phone Challenge screen context.
 */
export declare class ScreenOverride extends Screen implements OverrideOptions {
    /**
     * @property {object | null} data - Screen-specific data.
     * @property {string} data.phone_number - The phone number associated with this MFA challenge.
     */
    data: OverrideOptions['data'];
    /**
     * Initializes a new instance of the `ScreenOverride` class for the MFA Phone Challenge screen.
     * Parses the screen context to extract relevant data.
     * @param {ScreenContext} screenContext - The screen context provided by the Universal Login.
     */
    constructor(screenContext: ScreenContext);
    /**
     * @static
     * @method getScreenData
     * Extracts and transforms the screen-specific data from the provided screen context.
     *
     * @param {ScreenContext} screenContext - The screen context containing the raw data.
     * @returns {OverrideOptions['data']} The structured screen data for the MFA Phone Challenge,
     * or null if the required data (`phone_number`) is not present.
     */
    static getScreenData: (screenContext: ScreenContext) => OverrideOptions["data"];
}
//# sourceMappingURL=screen-override.d.ts.map