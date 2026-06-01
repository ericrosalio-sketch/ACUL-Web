import type { ClientContext, ClientMembers } from '../../interfaces/models/client';
/**
 * @class Client
 * @description Provides access to the Auth0 client (application) information, including ID, name, and metadata.
 * @implements {ClientMembers}
 */
export declare class Client implements ClientMembers {
    /** @property {string} id - The unique identifier of the client */
    id: ClientMembers['id'];
    /** @property {string} name - The name of the client */
    name: ClientMembers['name'];
    /** @property {string | null} logoUrl - URL to the client's logo, if available */
    logoUrl: ClientMembers['logoUrl'];
    /** @property {string | null} description - Description of the client, if available */
    description: ClientMembers['description'];
    /** @property {{ [key: string]: string } | null} metadata - Custom metadata associated with the client */
    metadata: ClientMembers['metadata'];
    /**
     * @constructor
     * @param {ClientContext} client - The client context from Universal Login
     */
    constructor(client: ClientContext);
}
//# sourceMappingURL=client.d.ts.map