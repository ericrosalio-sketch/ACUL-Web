export interface ClientContext {
    id: string;
    name: string;
    logo_uri?: string;
    description?: string;
    metadata?: {
        [key: string]: string;
    };
}
export interface ClientMembers {
    id: string;
    name: string;
    logoUrl: string | null;
    description: string | null;
    metadata: {
        [key: string]: string;
    } | null;
}
//# sourceMappingURL=client.d.ts.map