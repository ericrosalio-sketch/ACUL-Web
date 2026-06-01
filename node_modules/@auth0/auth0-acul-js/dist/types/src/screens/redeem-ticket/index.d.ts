import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { RedeemTicketMembers } from '../../../interfaces/screens/redeem-ticket';
/**
 * Implements the redeem-ticket screen functionality.
 */
export default class RedeemTicket extends BaseContext implements RedeemTicketMembers {
    static screenIdentifier: string;
    /**
     * Initializes a new instance of the RedeemTicket class.
     */
    constructor();
    /**
     * Performs the default action on the redeem-ticket screen, usually continuing the flow.
     *
     * @param payload - Optional custom options to include with the request.
     * @returns A promise that resolves when the action is complete.
     * @throws {Error} If the operation fails.
     *
     * @example
     * ```ts
     * import RedeemTicket from '@auth0/auth0-acul-js/redeem-ticket';
     *
     * const redeemTicket = new RedeemTicket();
     * await redeemTicket.continue();
     * ```
     */
    continue(payload?: CustomOptions): Promise<void>;
}
export { RedeemTicketMembers };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map