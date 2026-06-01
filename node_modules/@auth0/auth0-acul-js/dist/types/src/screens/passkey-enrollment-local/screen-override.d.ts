import { Screen } from '../../models/screen';
import type { ScreenContext } from '../../../interfaces/models/screen';
import type { ScreenMembersOnPasskeyEnrollmentLocal as OverrideOptions } from '../../../interfaces/screens/passkey-enrollment-local';
export declare class ScreenOverride extends Screen implements OverrideOptions {
    publicKey: OverrideOptions['publicKey'];
    constructor(screenContext: ScreenContext);
}
//# sourceMappingURL=screen-override.d.ts.map