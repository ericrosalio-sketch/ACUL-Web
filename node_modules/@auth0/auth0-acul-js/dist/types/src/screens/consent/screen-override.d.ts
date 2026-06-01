import { Screen } from '../../models/screen';
import type { Scope, ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnConsent } from '../../../interfaces/screens/consent';
/**
 * @class ScreenOverride
 * @extends Screen
 * @implements ScreenMembersOnConsent
 * @description Screen-specific override for the Consent screen ('consent').
 * This class ensures that the `screen.data` object, particularly the `scopes` array
 * and `hideScopes` flag, are correctly parsed and typed according to the {@link ScreenMembersOnConsent} interface.
 */
export declare class ScreenOverride extends Screen implements ScreenMembersOnConsent {
    scopes: Scope[];
    hideScopes: boolean;
    constructor(screenContext: ScreenContext);
    static getScopes: (screenContext: ScreenContext) => Scope[];
    static getHideScopes: (screenContext: ScreenContext) => boolean;
}
//# sourceMappingURL=screen-override.d.ts.map