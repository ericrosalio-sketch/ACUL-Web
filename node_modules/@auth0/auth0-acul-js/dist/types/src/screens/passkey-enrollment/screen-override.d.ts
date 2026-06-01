import { Screen } from '../../models/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnPasskeyEnrollment as OverrideOptions } from '../../../interfaces/screens/passkey-enrollment';
export declare class ScreenOverride extends Screen implements OverrideOptions {
    loginLink: OverrideOptions['loginLink'];
    backLink: OverrideOptions['backLink'];
    publicKey: OverrideOptions['publicKey'];
    constructor(screenContext: ScreenContext);
    static getPublicKey: (screenContext: ScreenContext) => OverrideOptions["publicKey"];
}
//# sourceMappingURL=screen-override.d.ts.map