

export class User {
    // Note: Using only optional constructor properties without backing store disables typescript's type checking for the type
   /* constructor(id?: string, userName?: string, title?: string, firstName?: string, lastName?: string, email?: string,   role?: string) {

        this.id = id;
        this.userName = userName;
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }*/

 /*   constructor() {}


    get friendlyName(): string {
        let name = this.firstName || this.lastName;

        if (this.title)
            name = this.title + " " + name;

        return name;
    }

    public id: string;
    public userName: string;
    public firstName: string;
    public lastName: string;
    public title: string;
    public email: string;
    public emailConfirmation: string;
    public password: string;
    public passwordConfirmation: string;
    public randomPassword: boolean;
    public isLockedOut: boolean;
    public sendActivationEmail: boolean;
    public forcePasswordChange: boolean;
    public role: string;
    public scope: number;
    public isEnabled: boolean;
    public LastLogin: Date;

    */

    id: string;
    businessProfileId: string;
    userName: string;
    title: string;
    firstName: string;
    lastName: string;
    scope: number;
    email: string;
    confirmEmail: string;
    password: string;
    confirmPassword: string;
    role: string;
    randomPassword: boolean;
    isLockedOut: boolean;
    sendActivationEmail: boolean;
    forcePasswordChang: boolean;
    isEnabled: boolean;

}
