import { MfaEnrollFactorType } from '../../constants';
import { BaseContext } from '../../models/base-context';
import type { MfaBeginEnrollOptionsMembers, MfaEnrollOptions } from '../../../interfaces/screens/mfa-begin-enroll-options';
/**
 * MFA Begin Enroll Options screen implementation class
 * Handles the selection and enrollment of MFA factors
 */
export default class MfaBeginEnrollOptions extends BaseContext implements MfaBeginEnrollOptionsMembers {
    static screenIdentifier: string;
    /**
     * Creates an instance of MFA Begin Enroll Options screen manager
     */
    constructor();
    /**
     * Continues the enrollment process with the selected factor
     * @param payload The enrollment options including the selected factor
     * @example
     * ```typescript
     * const mfaBeginEnrollOptions = new MfaBeginEnrollOptions();
     * await mfaBeginEnrollOptions.enroll({
     *   action: 'push-notification'
     * });
     * ```
     */
    enroll(payload: MfaEnrollOptions): Promise<void>;
}
export { MfaBeginEnrollOptionsMembers, MfaEnrollOptions, MfaEnrollFactorType };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map