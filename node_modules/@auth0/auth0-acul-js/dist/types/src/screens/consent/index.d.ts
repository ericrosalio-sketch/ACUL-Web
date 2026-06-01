import { Scope } from '../../../interfaces/models/screen';
import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { ConsentMembers, ScreenMembersOnConsent } from '../../../interfaces/screens/consent';
export default class Consent extends BaseContext implements ConsentMembers {
    static screenIdentifier: string;
    /**
     * Holds the specific screen data and properties for the Consent screen,
     * processed by `ScreenOverride`. This includes the list of `scopes` being requested
     * and the `hideScopes` flag.
     * @type {ScreenMembersOnConsent}
     * @public
     */
    screen: ScreenMembersOnConsent;
    /**
     * Creates an instance of the `Consent` screen manager.
     * The constructor initializes the `BaseContext` and sets up the `screen` property
     * with an instance of `ScreenOverride` tailored for the consent screen.
     * @throws {Error} If the Universal Login Context is not available or if the
     * current screen name in the context does not match `Consent.screenIdentifier`.
     */
    constructor();
    /**
     * Submits the user's decision to accept (grant) the requested permissions.
     * This method prepares and posts form data to the `/u/consent?state=<transaction_state>` endpoint
     * with `action: "accept"`. The transaction state is automatically included in both the
     * URL query parameter and the form body.
     *
     * @param {CustomOptions} [payload] - Optional. An object for any custom key-value pairs
     *                                    to be sent with the request. These parameters will be
     *                                    included in the form data submitted to the server.
     * @returns {Promise<void>} A promise that resolves once the form submission is initiated.
     *                          Typically, a successful submission leads to a server-side redirect.
     * @throws {Error} Throws an error if `FormHandler` encounters an unrecoverable issue
     *                 during submission (e.g., network error). Server-side validation errors
     *                 from Auth0 (like "invalid_request") are not thrown as JavaScript errors
     *                 but are made available in `this.transaction.errors` after the operation.
     * @example
     * ```typescript
     * import Consent from '@auth0/auth0-acul-js/consent';
     * const consentManager = new Consent();
     * const handleAccept = async () => {
     *  try {
     *    await consentManager.accept();
     *    console.log('Consent accepted successfully.');
     *  } catch (err) {
     *    console.error('Error accepting consent:', err);
     *  }
     * };
     * ```
     */
    accept(payload?: CustomOptions): Promise<void>;
    /**
     * Submits the user's decision to deny (reject) the requested permissions.
     * This method prepares and posts form data to the `/u/consent?state=<transaction_state>` endpoint
     * with `action: "deny"`. The transaction state is automatically included in both the
     * URL query parameter and the form body.
     *
     * @param {CustomOptions} [payload] - Optional. An object for any custom key-value pairs
     *                                    to be sent with the request. These parameters will be
     *                                    included in the form data submitted to the server.
     * @returns {Promise<void>} A promise that resolves once the form submission is initiated.
     *                          A successful submission usually results in a server-side redirect.
     * @throws {Error} Throws an error if `FormHandler` encounters an issue (e.g., network error).
     *                 Server-side validation errors are reflected in `this.transaction.errors`.
     * @example
     * ```typescript
     * import Consent from '@auth0/auth0-acul-js/consent';
     * const consentManager = new Consent();
     * const handleDeny = async () => {
     *  try {
     *    await consentManager.deny();
     *    console.log('Form denied successfully.');
     *  } catch (err) {
     *    console.error('Failed to deny form:', error);
     *  }
     * };
     */
    deny(payload?: CustomOptions): Promise<void>;
}
export { ConsentMembers, ScreenMembersOnConsent, Scope };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map