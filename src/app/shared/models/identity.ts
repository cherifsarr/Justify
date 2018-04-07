export class Identity {
     id: string;
     userName: string;
     firstName: string;
     lastName: string;
     scope: number = 0;
     email: string;
     normalizedUserName: string;
     emailConfirmed: boolean;
     password: string;
     passwordConfirmation: string;
     randomPassword: boolean;
     isLockedOut: boolean;
     isEnabled: boolean;
     roleId: string;
}