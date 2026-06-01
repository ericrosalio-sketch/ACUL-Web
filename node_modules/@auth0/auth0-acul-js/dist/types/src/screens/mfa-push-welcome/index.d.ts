import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { MfaPushWelcomeMembers, ScreenMembersOnMfaPushWelcome as ScreenOptions } from '../../../interfaces/screens/mfa-push-welcome';
/**
 * @extends {BaseContext}
 * Implements the mfa-push-welcome screen functionality.
 */
export default class MfaPushWelcome extends BaseContext implements MfaPushWelcomeMembers {
    static screenIdentifier: string;
    screen: ScreenOptions;
    /**
     * Initializes the MfaPushWelcome screen with data from the Universal Login Context.
     */
    constructor();
    /**
     * Navigates to the enrollment screen.
     * @param {CustomOptions} [payload] - Optional custom options to include with the request.
     * @example
     * ```typescript
     * import MfaPushWelcome from '@auth0/auth0-acul-js/mfa-push-welcome';
     *
     * const mfaPushWelcome = new MfaPushWelcome();
     * await mfaPushWelcome.enroll();
     * ```
     */
    enroll(payload?: CustomOptions): Promise<void>;
    /**
     * Navigates to the authenticator selection screen.
     * @param {CustomOptions} [payload] - Optional custom options to include with the request.
     * @example
     * ```typescript
     * import MfaPushWelcome from '@auth0/auth0-acul-js/mfa-push-welcome';
     *
     * const mfaPushWelcome = new MfaPushWelcome();
     * await mfaPushWelcome.pickAuthenticator();
     * ```
     */
    pickAuthenticator(payload?: CustomOptions): Promise<void>;
}
export { MfaPushWelcomeMembers, ScreenOptions as ScreenMembersOnMfaPushWelcome };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map