export class AppUser {
    id: string;
    firstName: string;
    lastName: string;
    scope: number;
    userName: string;
    normalizedUserName: string;
    email: string;
    normalizedEmail: string;
    emailConfirmed: boolean;
    passwordHash: string;
    securityStamp: string;
    concurrencyStamp: string;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
    twoFactorEnabled: boolean;
    lockoutEnd: string;
    lockoutEnabled: boolean;
    accessFailedCount: boolean;
}