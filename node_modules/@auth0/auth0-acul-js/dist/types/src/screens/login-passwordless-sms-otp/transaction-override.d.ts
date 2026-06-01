import { Transaction } from '../../models/transaction';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnLoginPasswordlessSmsOtp as OverrideOptions } from '../../../interfaces/screens/login-passwordless-sms-otp';
export declare class TransactionOverride extends Transaction implements OverrideOptions {
    isSignupEnabled: OverrideOptions['isSignupEnabled'];
    constructor(transactionContext: TransactionContext);
}
//# sourceMappingURL=transaction-override.d.ts.map