import { BaseContext } from '../../models/base-context';
import type { MfaDetectBrowserCapabilitiesMembers } from '../../../interfaces/screens/mfa-detect-browser-capabilities';
import type { CustomOptions } from 'interfaces/common';
/**
 * Class implementing the mfa-detect-browser-capabilities screen functionality
 * This screen detects browser capabilities for MFA authentication methods
 */
export default class MfaDetectBrowserCapabilities extends BaseContext implements MfaDetectBrowserCapabilitiesMembers {
    static screenIdentifier: string;
    /**
     * Creates an instance of MfaDetectBrowserCapabilities screen manager
     */
    constructor();
    /**
     * Picks an authenticator based on browser capabilities
     * @param payload The options containing browser capability flags
     * @example
     * ```typescript
     * const mfaDetectBrowserCapabilities = new MfaDetectBrowserCapabilities();
     * await mfaDetectBrowserCapabilities.detectCapabilities();
     * ```
     */
    detectCapabilities(payload?: CustomOptions): Promise<void>;
}
export { MfaDetectBrowserCapabilitiesMembers };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map