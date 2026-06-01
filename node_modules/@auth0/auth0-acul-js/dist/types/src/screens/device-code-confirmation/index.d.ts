import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { DeviceCodeConfirmationMembers, ScreenMembersOnDeviceCodeConfirmation as screenOptions } from '../../../interfaces/screens/device-code-confirmation';
/**
 * Class implementing the Device Code Confirmation screen functionality.
 * This screen is displayed when the user needs to confirm the device code.
 */
export default class DeviceCodeConfirmation extends BaseContext implements DeviceCodeConfirmationMembers {
    static screenIdentifier: string;
    screen: screenOptions;
    /**
     * Creates an instance of the DeviceCodeConfirmation screen.
     */
    constructor();
    /**
     * Confirms the device code.
     * @param payload Optional custom options to include with the request.
     * @example
     * ```typescript
     * import DeviceCodeConfirmation from '@auth0/auth0-acul-js/device-code-confirmation';
     *
     * const deviceCodeConfirmation = new DeviceCodeConfirmation();
     * await deviceCodeConfirmation.confirm();
     * ```
     */
    confirm(payload?: CustomOptions): Promise<void>;
    /**
     * Cancels the device code flow.
     * @param payload Optional custom options to include with the request.
     * @example
     * ```typescript
     * import DeviceCodeConfirmation from '@auth0/auth0-acul-js/device-code-confirmation';
     *
     * const deviceCodeConfirmation = new DeviceCodeConfirmation();
     * await deviceCodeConfirmation.cancel();
     * ```
     */
    cancel(payload?: CustomOptions): Promise<void>;
}
export { DeviceCodeConfirmationMembers, screenOptions as ScreenMembersOnDeviceCodeConfirmation };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map