/**
 * Constants for connection strategies used throughout the application
 */
export declare const ConnectionStrategy: {
    readonly SMS: "sms";
    readonly EMAIL: "email";
};
/**
 * Type representing valid connection strategy values
 */
export type ConnectionStrategyType = (typeof ConnectionStrategy)[keyof typeof ConnectionStrategy];
//# sourceMappingURL=connection-strategy.d.ts.map