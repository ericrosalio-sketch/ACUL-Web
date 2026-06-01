export declare const baseContextData: {
    client: {
        id: string;
        name: string;
    };
    prompt: {
        name: string;
    };
    screen: {
        data: {
            webauthnType: string;
            passkey: {
                public_key: {
                    challenge: string;
                    user: {
                        id: string;
                        name: string;
                        displayName: string;
                    };
                    rp: {
                        id: string;
                        name: string;
                    };
                    pubKeyCredParams: {
                        type: string;
                        alg: number;
                    }[];
                    authenticatorSelection: {
                        residentKey: string;
                        userVerification: string;
                    };
                };
            };
        };
        links: {
            reset_password: string;
            signup: string;
        };
        name: string;
    };
    transaction: {
        country_code: {
            code: string;
            prefix: string;
        };
        alternate_connections: {
            name: string;
            strategy: string;
        }[];
        connection: {
            name: string;
            strategy: string;
            options: {
                signup_enabled: boolean;
                forgot_password_enabled: boolean;
                attributes: {
                    email: {
                        signup_status: string;
                    };
                    phone: {
                        signup_status: string;
                    };
                    username: {
                        signup_status: string;
                        validation: {
                            max_length: number;
                            min_length: number;
                            allowed_types: {
                                email: boolean;
                                phone_number: boolean;
                            };
                        };
                    };
                };
                authentication_methods: {
                    password: {
                        enabled: boolean;
                        policy: string;
                        min_length: number;
                    };
                    passkey: {
                        enabled: boolean;
                    };
                };
            };
        };
        locale: string;
        state: string;
    };
    organization: {
        id: string;
        name: string;
        usage: string;
    };
    user: {
        id: string;
        email: string;
        username: string;
        picture: string;
        phone_number: string;
        enrolled_factors: string[];
    };
    branding: {};
    tenant: {};
    untrusted_data: {};
};
//# sourceMappingURL=test-data.d.ts.map