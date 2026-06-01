import type { UntrustedDataContext, UntrustedDataMembers } from '../../interfaces/models/untrusted-data';
/**
 * @class UntrustedData
 * @description Provides access to untrusted data that may be supplied by the client or other external sources.
 * @implements {UntrustedDataMembers}
 */
export declare class UntrustedData implements UntrustedDataMembers {
    /** @property {Record<string, string | number | boolean | undefined> | null} submittedFormData - Form data submitted by the user */
    submittedFormData: UntrustedDataMembers['submittedFormData'];
    /** @property {Record<string, string> | null} authorizationParams - Authorization parameters from the request */
    authorizationParams: UntrustedDataMembers['authorizationParams'];
    /**
     * @constructor
     * @param {UntrustedDataContext | undefined} untrustedData - The untrusted data context
     */
    constructor(untrustedData: UntrustedDataContext | undefined);
    /**
     * @static
     * @method getSubmittedFormData
     * @description Extracts submitted form data from the untrusted data context
     * @param {UntrustedDataContext | undefined} untrustedData - The untrusted data context
     * @returns {Record<string, string | number | boolean | undefined> | null} Submitted form data or null if unavailable
     */
    static getSubmittedFormData(untrustedData: UntrustedDataContext | undefined): UntrustedDataMembers['submittedFormData'];
    /**
     * @static
     * @method getAuthorizationParams
     * @description Extracts authorization parameters from the untrusted data context
     * @param {UntrustedDataContext | undefined} untrustedData - The untrusted data context
     * @returns {Record<string, string> | null} Authorization parameters or null if unavailable
     */
    static getAuthorizationParams(untrustedData: UntrustedDataContext | undefined): UntrustedDataMembers['authorizationParams'];
}
//# sourceMappingURL=untrusted-data.d.ts.map