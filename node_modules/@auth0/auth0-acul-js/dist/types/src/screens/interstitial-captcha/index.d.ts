import { BaseContext } from '../../models/base-context';
import type { InterstitialCaptchaMembers, SubmitCaptchaOptions } from '../../../interfaces/screens/interstitial-captcha';
export default class InterstitialCaptcha extends BaseContext implements InterstitialCaptchaMembers {
    static screenIdentifier: string;
    constructor();
    /**
     * @remarks
     * This methods handles InterstitialCaptcha related configuration.
     *
     * @example
     * import InterstitialCaptcha from "@auth0/auth0-acul-js/interstitial-captcha";
     *
     * const interstitialCaptcha = new InterstitialCaptcha();
     * interstitialCaptcha.submitCaptcha({
     *  captcha: "captchaValue",
     * });
     */
    submitCaptcha(payload: SubmitCaptchaOptions): Promise<void>;
}
export { InterstitialCaptchaMembers, SubmitCaptchaOptions };
export * from '../../../interfaces/export/common';
export * from '../../../interfaces/export/base-properties';
//# sourceMappingURL=index.d.ts.map