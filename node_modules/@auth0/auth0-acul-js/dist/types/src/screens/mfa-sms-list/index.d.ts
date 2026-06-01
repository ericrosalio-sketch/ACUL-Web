import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { MfaSmsListMembers, MfaSmsListOptions } from '../../../interfaces/screens/mfa-sms-list';
/**
 * @class MfaSmsList
 * Class for handling the mfa-sms-list screen.
 * @extends {BaseContext}
 */
export default class MfaSmsList extends BaseContext implements MfaSmsListMembers {
    static screenIdentifier: string;
    constructor();
    /**
     * Selects a phone number from the list of enrolled phone numbers.
     * @param {MfaSmsListOptions} [payload] - Optional payload for the action.
     * @returns {Promise<void>}
     * @throws {Error} If the index is out of bounds.
     * @example
     * ```typescript
     * import MfaSmsList from '@auth0/auth0-acul-js/mfa-sms-list';
     * const mfaSmsList = new MfaSmsList();
     * const selectPhoneNumber = async () => {
     *  const getEnrolledPhoneNumbers = mfaSmsList.user.enrolledPhoneNumbers;
     *  const selectedNumber = getEnrolledPhoneNumbers[0];
     *  await mfaSmsList.selectPhoneNumber({index: selectedNumber});
     * }
     * ```
     */
    selectPhoneNumber(payload?: MfaSmsListOptions): Promise<void>;
    /**
     * Navigates back to the previous screen.
     * @param {MfaSmsListOptions} [payload] - Optional payload for the action.
     * @returns {Promise<void>}
     * @example
     * ```typescript
     * import MfaSmsList from '@auth0/auth0-acul-js/mfa-sms-list';
     * const mfaSmsList = new MfaSmsList();
     * const handleBackAction = async () => {
     *  try {
     *    await mfaSmsList.backAction();
     *  } catch (error) {
     *    console.error('Failed to go back:', error);
     *  }
     * };
     * ```
     */
    backAction(payload?: CustomOptions): Promise<void>;
}
export { MfaSmsListMembers, MfaSmsListOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map