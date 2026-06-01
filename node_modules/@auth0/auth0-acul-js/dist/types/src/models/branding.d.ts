import type { BrandingContext, BrandingMembers } from '../../interfaces/models/branding';
/**
 * @class Branding
 * @description Provides access to the tenant's branding settings, including colors, logos, and themes.
 * @implements {BrandingMembers}
 */
export declare class Branding implements BrandingMembers {
    /** @property {BrandingSettings | null} settings - Branding settings like colors, logo URLs, etc. */
    settings: BrandingMembers['settings'];
    /** @property {BrandingThemes | null} themes - Branding themes defining the visual appearance */
    themes: BrandingMembers['themes'];
    /**
     * @constructor
     * @param {BrandingContext | undefined} branding - The branding context from Universal Login
     */
    constructor(branding: BrandingContext | undefined);
    /**
     * @static
     * @method getSettings
     * @description Extracts and transforms branding settings from the context
     * @param {BrandingContext | undefined} branding - The branding context
     * @returns {BrandingSettings | null} Structured branding settings or null if unavailable
     */
    static getSettings(branding: BrandingContext | undefined): BrandingMembers['settings'];
    /**
     * @static
     * @method getThemes
     * @description Extracts and transforms branding themes from the context
     * @param {BrandingContext | undefined} branding - The branding context
     * @returns {BrandingThemes | null} Structured branding themes or null if unavailable
     */
    static getThemes(branding: BrandingContext | undefined): BrandingMembers['themes'];
}
//# sourceMappingURL=branding.d.ts.map