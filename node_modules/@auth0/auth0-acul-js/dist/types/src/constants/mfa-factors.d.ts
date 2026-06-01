/**
 * MFA Factor Types
 * Constants for available MFA login factor types used across authentication flows
 */
export declare const MfaLoginFactorEnum: {
    readonly PUSH_NOTIFICATION: "push-notification";
    readonly OTP: "otp";
    readonly SMS: "sms";
    readonly PHONE: "phone";
    readonly VOICE: "voice";
    readonly EMAIL: "email";
    readonly RECOVERY_CODE: "recovery-code";
    readonly WEBAUTHN_ROAMING: "webauthn-roaming";
    readonly WEBAUTHN_PLATFORM: "webauthn-platform";
    readonly DUO: "duo";
};
/**
 * Type definition for MFA login factor constants
 */
export type MfaLoginFactorType = 'push-notification' | 'otp' | 'sms' | 'phone' | 'voice' | 'email' | 'recovery-code' | 'webauthn-roaming' | 'webauthn-platform' | 'duo';
/**
 * MFA Factor Types
 * Constants for available MFA enroll factor types used across authentication flows
 */
export declare const MfaEnrollFactorEnum: {
    readonly PUSH_NOTIFICATION: "push-notification";
    readonly OTP: "otp";
    readonly SMS: "sms";
    readonly PHONE: "phone";
    readonly VOICE: "voice";
    readonly WEBAUTHN_ROAMING: "webauthn-roaming";
};
/**
 * Type definition for MFA enroll factor constants
 */
export type MfaEnrollFactorType = 'push-notification' | 'otp' | 'sms' | 'phone' | 'voice' | 'webauthn-roaming';
//# sourceMappingURL=mfa-factors.d.ts.map