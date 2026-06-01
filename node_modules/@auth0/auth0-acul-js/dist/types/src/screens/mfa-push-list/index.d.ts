import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { MfaPushListMembers, SelectMfaPushDeviceOptions } from '../../../interfaces/screens/mfa-push-list';
/**
 * Class implementing the mfa-push-list screen functionality
 */
export default class MfaPushList extends BaseContext implements MfaPushListMembers {
    static screenIdentifier: string;
    constructor();
    /**
     * Selects a registered device from the list to initiate MFA push.
     *
     * @param payload The options containing the device index.
     * @example
     * ```typescript
     * import MfaPushList from '@auth0/auth0-acul-js/mfa-push-list';
     *
     * const mfaPushList = new MfaPushList();
     * await mfaPushList.selectMfaPushDevice({ deviceIndex: 0 });
     * ```
     */
    selectMfaPushDevice(payload: SelectMfaPushDeviceOptions): Promise<void>;
    /**
     * Navigates back to the previous screen.
     * @param payload Optional custom options to include with the request.
     * @example
     * ```typescript
     * import MfaPushList from '@auth0/auth0-acul-js/mfa-push-list';
     *
     * const mfaPushList = new MfaPushList();
     * await mfaPushList.goBack();
     * ```
     */
    goBack(payload?: CustomOptions): Promise<void>;
}
export { MfaPushListMembers, SelectMfaPushDeviceOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map