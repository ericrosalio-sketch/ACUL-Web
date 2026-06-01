import { BaseContext } from '../../models/base-context';
import type { DeviceCodeActivationMembers, ContinueOptions } from '../../../interfaces/screens/device-code-activation';
/**
 * Class implementing the Device Code Activation screen functionality.
 * This screen is displayed when the user needs to enter the code on their device to activate it.
 */
export default class DeviceCodeActivation extends BaseContext implements DeviceCodeActivationMembers {
    static screenIdentifier: string;
    /**
     * Creates an instance of the DeviceCodeActivation screen.
     */
    constructor();
    /**
     * Submits the device code entered by the user.
     * This action is triggered when the user enters the code displayed on their device and submits the form.
     *
     * @param {object} payload - An object containing the code entered by the user and any custom payload.
     * @param {string} payload.code - The device code entered by the user.
     *
     * @returns {Promise<void>} A promise that resolves when the code is successfully submitted.
     * @example
     * ```typescript
     * import DeviceCodeActivation from '@auth0/auth0-acul-js/device-code-activation';
     * const deviceCodeActivationManager = new DeviceCodeActivation();
     * async function activateDeviceCode(code) {
     *   try {
     *    await deviceCodeActivationManager.continue({ code });
     *    console.log('Device code activation successful.');
     *   } catch (error) {
     *    console.error('Error during device code activation:', error);
     *   }
     * }
     * ```
     * Rejects with an error if the submission fails.
     */
    continue(payload: ContinueOptions): Promise<void>;
}
export { DeviceCodeActivationMembers, ContinueOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map