import { BaseContext } from '../../models/base-context';
import type { ConfirmLogoutOptions, LogoutMembers } from '../../../interfaces/screens/logout';
/**
 * Class implementing the logout screen functionality.
 * This screen allows users to confirm or deny the logout action.
 */
export default class Logout extends BaseContext implements LogoutMembers {
    static screenIdentifier: string;
    /**
     * Creates an instance of the Logout screen manager.
     */
    constructor();
    /**
     * Confirms the logout action (accept or deny).
     * @param payload The options containing the action to perform.
     * @example
     * ```typescript
     * import Logout from '@auth0/auth0-acul-js/logout';
     *
     * const logout = new Logout();
     *
     * await logout.confirmLogout({ action: 'accept' });
     * ```
     */
    confirmLogout(payload: ConfirmLogoutOptions): Promise<void>;
}
export { LogoutMembers, ConfirmLogoutOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map