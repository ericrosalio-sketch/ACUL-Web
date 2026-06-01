import type { PasskeyCreate, PasskeyRead, Scope, ScreenContext } from '../../interfaces/models/screen';
/**
 * Retrieves the signup link from the screen context.
 *
 * @param {ScreenContext} screen - The screen context object from Universal Login.
 * @returns {string | null} - The signup link URL or null if not available.
 */
export declare function getSignupLink(screen: ScreenContext): string | null;
/**
 * Retrieves the back link from the screen context.
 *
 * @param {ScreenContext} screen - The screen context object from Universal Login.
 * @returns {string | null} - The back link URL or null if not available.
 */
export declare function getBackLink(screen: ScreenContext): string | null;
/**
 * Retrieves the login link from the screen context.
 *
 * @param {ScreenContext} screen - The screen context object from Universal Login.
 * @returns {string | null} - The login link URL or null if not available.
 */
export declare function getLoginLink(screen: ScreenContext): string | null;
/**
 * Retrieves the reset password link from the screen context.
 *
 * @param {ScreenContext} screen - The screen context object from Universal Login.
 * @returns {string | null} - The reset password link URL or null if not available.
 */
export declare function getResetPasswordLink(screen: ScreenContext): string | null;
/**
 * Retrieves the forgot password link from the screen context.
 *
 * @param {ScreenContext} screen - The screen context object from Universal Login.
 * @returns {string | null} - The forgot password link URL or null if not available.
 */
export declare function getForgotPasswordLink(screen: ScreenContext): string | null;
/**
 * Retrieves the edit identifier link from the screen context.
 *
 * @param {ScreenContext} screen - The screen context object from Universal Login.
 * @returns {string | null} - The edit identifier link URL or null if not available.
 */
export declare function getEditIdentifierLink(screen: ScreenContext): string | null;
/**
 * Retrieves the public key for passkeys from the screen context.
 *
 * @param {ScreenContext} screen - The screen context object from Universal Login.
 * @returns {PasskeyRead['public_key'] | PasskeyCreate['public_key'] | null} - The public key for passkeys or null if not available.
 */
export declare function getPublicKey(screen: ScreenContext): PasskeyRead['public_key'] | PasskeyCreate['public_key'] | null;
/**
 * Retrieves the remember device option from the screen context.
 * This is used in MFA flows where users can choose to remember their device for future logins.
 *
 * @param {ScreenContext} screen - The screen context object from Universal Login.
 * @returns {boolean} - Whether the remember device option is available and enabled.
 */
export declare function getShowRememberDevice(screen: ScreenContext): boolean;
/**
 * Retrieves the WebAuthn type from the screen context.
 *
 * @param {ScreenContext} screen - The screen context object from Universal Login.
 * @returns {string | null} - The WebAuthn type (e.g., 'roaming', 'platform') or null if not available.
 */
export declare function getWebAuthnType(screen: ScreenContext): string | null;
/**
 * Retrieves and processes the scopes from the provided screen context.
 *
 * This function ensures that the scopes are properly formatted and validated.
 * It provides default values for optional fields and ensures that the `values`
 * property is always an array of strings. Invalid entries are filtered out.
 *
 * @param screen - The screen context containing the data with scopes.
 * @returns An array of processed `Scope` objects.
 */
export declare function getScopes(screen: ScreenContext): Scope[];
//# sourceMappingURL=screen.d.ts.map