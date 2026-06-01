import { Transaction } from '../../../src/models/transaction';
import type { TransactionContext } from '../../../interfaces/models/transaction';
import type { TransactionMembersOnResetPasswordRequest as OverrideMembers } from '../../../interfaces/screens/reset-password-request';
export declare class TransactionOverride extends Transaction implements OverrideMembers {
    allowedIdentifiers: OverrideMembers['allowedIdentifiers'];
    requiredIdentifiers: OverrideMembers['requiredIdentifiers'];
    hasFlexibleIdentifier: OverrideMembers['hasFlexibleIdentifier'];
    constructor(transactionContext: TransactionContext);
    static getAllowedIdentifiers(transactionContext: TransactionContext, connectionStrategy: string | null): OverrideMembers['allowedIdentifiers'];
    static getRequiredIdentifiers(transactionContext: TransactionContext, connectionStrategy: string | null): OverrideMembers['requiredIdentifiers'];
}
//# sourceMappingURL=transaction-override.d.ts.map