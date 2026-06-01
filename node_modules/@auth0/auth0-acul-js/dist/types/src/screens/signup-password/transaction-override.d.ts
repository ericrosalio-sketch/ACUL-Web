import { Transaction } from '../../models/transaction';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnSignupPassword as OverrideOptions } from '../../../interfaces/screens/signup-password';
export declare class TransactionOverride extends Transaction implements OverrideOptions {
    isPasskeyEnabled: OverrideOptions['isPasskeyEnabled'];
    passwordPolicy: OverrideOptions['passwordPolicy'];
    optionalIdentifiers: OverrideOptions['optionalIdentifiers'];
    requiredIdentifiers: OverrideOptions['requiredIdentifiers'];
    constructor(transactionContext: TransactionContext);
    static getRequiredIdentifiers(transactionContext: TransactionContext, connectionStrategy: string | null): OverrideOptions['requiredIdentifiers'];
}
//# sourceMappingURL=transaction-override.d.ts.map