import type { TransactionContext, TransactionMembers } from '../../interfaces/models/transaction';
/**
 * @class Transaction
 * @description Provides access to the current authentication transaction, including state, errors, connections, and locale.
 * @implements {TransactionMembers}
 */
export declare class Transaction implements TransactionMembers {
    /** @property {string} state - The current state of the authentication transaction */
    state: TransactionMembers['state'];
    /** @property {boolean} hasErrors - Indicates if the transaction has errors */
    hasErrors: TransactionMembers['hasErrors'];
    /** @property {string} locale - The current locale for the transaction */
    locale: TransactionMembers['locale'];
    /** @property {string | null} countryCode - The country code if available */
    countryCode: TransactionMembers['countryCode'];
    /** @property {string | null} countryPrefix - The phone prefix for the country */
    countryPrefix: TransactionMembers['countryCode'];
    /** @property {string | null} connectionStrategy - The strategy of the current connection */
    connectionStrategy: TransactionMembers['connectionStrategy'];
    /** @property {Error[] | null} errors - List of errors in the transaction */
    errors: TransactionMembers['errors'];
    /** @property {Connection | null} currentConnection - The connection being used */
    currentConnection: TransactionMembers['currentConnection'];
    /** @property {(Connection | EnterpriseConnection)[] | null} alternateConnections - Other available connections */
    alternateConnections: TransactionMembers['alternateConnections'];
    /**
     * @constructor
     * @param {TransactionContext} transaction - The transaction context from Universal Login
     */
    constructor(transaction: TransactionContext);
    /**
     * @static
     * @method getErrors
     * @description Extracts and transforms error information from the transaction
     * @param {TransactionContext} transaction - The transaction context
     * @returns {Error[] | null} Array of errors or null if no errors
     */
    static getErrors(transaction: TransactionContext): TransactionMembers['errors'];
    /**
     * @static
     * @method getCurrentConnection
     * @description Extracts information about the current connection
     * @param {TransactionContext} transaction - The transaction context
     * @returns {Connection | null} The current connection or null if unavailable
     */
    static getCurrentConnection(transaction: TransactionContext): TransactionMembers['currentConnection'];
    /**
     * @static
     * @method getAlternateConnections
     * @description Extracts information about alternate connections (like social providers)
     * @param {TransactionContext} transaction - The transaction context
     * @returns {(Connection | EnterpriseConnection)[] | null} Array of alternate connections or null if none
     */
    static getAlternateConnections(transaction: TransactionContext): TransactionMembers['alternateConnections'];
}
//# sourceMappingURL=transaction.d.ts.map