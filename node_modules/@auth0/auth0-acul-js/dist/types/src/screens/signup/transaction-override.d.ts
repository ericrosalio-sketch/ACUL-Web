import { Transaction } from '../../models/transaction';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnSignup as OverrideOptions } from '../../../interfaces/screens/signup';
export declare class TransactionOverride extends Transaction implements OverrideOptions {
    isPasskeyEnabled: OverrideOptions['isPasskeyEnabled'];
    usernamePolicy: OverrideOptions['usernamePolicy'];
    optionalIdentifiers: OverrideOptions['optionalIdentifiers'];
    requiredIdentifiers: OverrideOptions['requiredIdentifiers'];
    passwordPolicy: OverrideOptions['passwordPolicy'];
    constructor(transactionContext: TransactionContext);
    static getRequiredIdentifiers(transactionContext: TransactionContext, connectionStrategy: string | null): OverrideOptions['requiredIdentifiers'];
}
//# sourceMappingURL=transaction-override.d.ts.map