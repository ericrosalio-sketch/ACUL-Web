import { BaseContext } from '../../models/base-context';
import type { MfaWebAuthnChangeKeyNicknameMembers, ScreenMembersOnMfaWebAuthnChangeKeyNickname as ScreenOptions, ContinueOptions } from '../../../interfaces/screens/mfa-webauthn-change-key-nickname';
export default class MfaWebAuthnChangeKeyNickname extends BaseContext implements MfaWebAuthnChangeKeyNicknameMembers {
    static screenIdentifier: string;
    /**
     * Holds the specific screen data and properties for this screen,
     * processed by `ScreenOverride`. This includes the current `nickname` of the key.
     * @type {ScreenOptions}
     * @public
     */
    screen: ScreenOptions;
    /**
     * Initializes a new instance of the `MfaWebAuthnChangeKeyNickname` class.
     * It retrieves the necessary context (screen, transaction, etc.) from the global
     * `universal_login_context` and sets up screen-specific properties via `ScreenOverride`.
     * @throws {Error} If the Universal Login Context is not available or if the screen name
     * in the context does not match `MfaWebAuthnChangeKeyNickname.screenIdentifier`.
     */
    constructor();
    /**
     * Submits the new nickname provided by the user for their WebAuthn security key.
     * This method prepares and posts the form data, including the new `nickname` and the
     * required `action: "default"`, to the `/u/mfa-webauthn-change-key-nickname` endpoint.
     *
     * @param {ContinueOptions} payload - An object containing the `nickname` (string)
     *                                    entered by the user. May also contain other custom
     *                                    parameters if needed for extensibility.
     * @returns {Promise<void>} A promise that resolves once the form submission is initiated.
     *                          Typically, a successful submission leads to a server-side redirect.
     *                          If the nickname is invalid or another error occurs, the page will
     *                          re-render, and `this.transaction.errors` will be populated with details.
     * @throws {Error} If `payload.nickname` is missing or not a string. It can also
     *                 throw if `FormHandler` encounters an unrecoverable issue during submission
     *                 (e.g., network error). Auth0 validation errors (e.g., "nickname-too-long")
     *                 are not thrown as JS errors but are made available in `this.transaction.errors`
     *                 post-operation.
     */
    continueWithNewNickname(payload: ContinueOptions): Promise<void>;
}
export { MfaWebAuthnChangeKeyNicknameMembers, ScreenOptions as ScreenMembersOnMfaWebAuthnChangeKeyNickname, ContinueOptions, };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map