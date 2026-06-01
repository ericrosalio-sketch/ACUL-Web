import type { UserContext, UserMembers } from '../../interfaces/models/user';
/**
 * @class User
 * @description Provides access to user information including profile data, enrolled factors, and organizations.
 * @implements {UserMembers}
 */
export declare class User implements UserMembers {
    /** @property {string | null} id - The unique identifier of the user */
    id: UserMembers['id'];
    /** @property {string | null} username - The username of the user */
    username: UserMembers['username'];
    /** @property {string | null} email - The email address of the user */
    email: UserMembers['email'];
    /** @property {string | null} picture - URL to the user's profile picture */
    picture: UserMembers['picture'];
    /** @property {string | null} phoneNumber - The phone number of the user */
    phoneNumber: UserMembers['phoneNumber'];
    /** @property {{ [key: string]: string } | null} userMetadata - User-specific metadata that can be modified */
    userMetadata: UserMembers['userMetadata'];
    /** @property {{ [key: string]: string } | null} appMetadata - Application-specific metadata about the user */
    appMetadata: UserMembers['appMetadata'];
    /** @property {string[] | null} enrolledFactors - List of MFA factors the user has enrolled in */
    enrolledFactors: UserMembers['enrolledFactors'];
    /** @property {EnrolledEmail[] | null} enrolledEmails - List of emails the user has enrolled for MFA */
    enrolledEmails: UserMembers['enrolledEmails'];
    /** @property {EnrolledPhoneNumber[] | null} enrolledPhoneNumbers - List of phone numbers the user has enrolled for MFA */
    enrolledPhoneNumbers: UserMembers['enrolledPhoneNumbers'];
    /** @property {EnrolledDevice[] | null} enrolledDevices - List of devices the user has enrolled for MFA */
    enrolledDevices: UserMembers['enrolledDevices'];
    /**
     * @property {Array<{organizationId: string | undefined, organizationName: string | undefined, displayName: string | undefined, branding: {logoUrl: string | undefined} | undefined}> | null} organizations
     * - Organizations the user belongs to
     */
    organizations: UserMembers['organizations'];
    /**
     * @constructor
     * @param {UserContext} user - The user context from Universal Login
     */
    constructor(user: UserContext);
    /**
     * @static
     * @method getOrganizations
     * @description Extracts and transforms organization information for the user
     * @param {UserContext} user - The user context
     * @returns {Array<{organizationId: string | undefined, organizationName: string | undefined, displayName: string | undefined, branding: {logoUrl: string | undefined} | undefined}> | null}
     * - Array of user's organizations or null if none
     */
    static getOrganizations(user: UserContext): UserMembers['organizations'];
}
//# sourceMappingURL=user.d.ts.map