import { BaseContext } from '../../models/base-context';
import type { CustomOptions } from '../../../interfaces/common';
import type { MfaCountryCodesMembers, ScreenMembersOnMfaCountryCodes as ScreenOptions, SelectCountryCodeOptions } from '../../../interfaces/screens/mfa-country-codes';
/**
 * Class implementing the mfa-country-codes screen functionality
 * This screen allows users to select a country code for MFA phone number verification
 */
export default class MfaCountryCodes extends BaseContext implements MfaCountryCodesMembers {
    static screenIdentifier: string;
    screen: ScreenOptions;
    /**
     * Creates an instance of MfaCountryCodes screen manager
     */
    constructor();
    /**
     * Selects a country code from the available options
     * @param payload The options containing the country code selection action
     * @example
     * ```typescript
     * import MfaCountryCodes from '@auth0/auth0-acul-js/mfa-country-codes';
     *
     * const mfaCountryCodes = new MfaCountryCodes();
     *
     * // Get the available country codes and phone prefixes
     * const { screen } = mfaCountryCodes;
     * const { phone_prefixes } = screen.data
     * const {country_code, phone_prefix} = phone_prefixes[0]
     *
     * await mfaCountryCodes.selectCountryCode({
     *   country_code: 'US',
     *   phone_prefix: '+1',
     * });
     * ```
     */
    selectCountryCode(payload: SelectCountryCodeOptions): Promise<void>;
    /**
     * Navigates back to the previous screen
     * @param payload Optional custom options to include with the request
     * @example
     * ```typescript
     * import MfaCountryCodes from '@auth0/auth0-acul-js/mfa-country-codes';
     *
     * const mfaCountryCodes = new MfaCountryCodes();
     * await mfaCountryCodes.goBack();
     * ```
     */
    goBack(payload?: CustomOptions): Promise<void>;
}
export { MfaCountryCodesMembers, ScreenOptions as ScreenMembersOnMfaCountryCodes, SelectCountryCodeOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map