import { Screen } from '../../models/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnMfaVoiceChallenge as OverrideOptions } from '../../../interfaces/screens/mfa-voice-challenge';
/**
 * Extended Screen implementation for MFA Voice Challenge screen.
 */
export declare class ScreenOverride extends Screen implements OverrideOptions {
    /**
     * Additional screen data specific to MFA voice challenge.
     */
    data: OverrideOptions['data'];
    /**
     * Creates an instance of ScreenOverride.
     *
     * @param screenContext - The screen context from Universal Login
     */
    constructor(screenContext: ScreenContext);
    /**
     * Transforms the raw screen data into a more user-friendly format.
     *
     * @param screenContext - The screen context from Universal Login
     * @returns Formatted screen data or null if no data is available
     */
    static getScreenData: (screenContext: ScreenContext) => OverrideOptions["data"];
}
//# sourceMappingURL=screen-override.d.ts.map