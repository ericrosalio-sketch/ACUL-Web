import { Transaction } from '../../models/transaction';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnLoginPasswordlessEmailCode as OverrideOptions } from '../../../interfaces/screens/login-passwordless-email-code';
export declare class TransactionOverride extends Transaction implements OverrideOptions {
    isSignupEnabled: OverrideOptions['isSignupEnabled'];
    constructor(transactionContext: TransactionContext);
}
//# sourceMappingURL=transaction-override.d.ts.map