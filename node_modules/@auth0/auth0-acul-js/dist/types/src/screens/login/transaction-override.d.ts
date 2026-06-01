import { Transaction } from '../../models/transaction';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnLogin as OverrideOptions } from '../../../interfaces/screens/login';
/**
 * Login transaction override implementation
 */
export declare class TransactionOverride extends Transaction implements OverrideOptions {
    isSignupEnabled: OverrideOptions['isSignupEnabled'];
    isForgotPasswordEnabled: OverrideOptions['isForgotPasswordEnabled'];
    isPasskeyEnabled: OverrideOptions['isPasskeyEnabled'];
    passwordPolicy: OverrideOptions['passwordPolicy'];
    allowedIdentifiers: OverrideOptions['allowedIdentifiers'];
    constructor(transactionContext: TransactionContext);
    static getAllowedIdentifiers(transactionContext: TransactionContext, connectionStrategy: string | null): OverrideOptions['allowedIdentifiers'];
}
//# sourceMappingURL=transaction-override.d.ts.map