import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

    constructor(public jwtHelper: JwtHelperService) { }
    // ...
    public isAuthenticated(): boolean {
        try {
            const token = sessionStorage.getItem('auth_token');
            console.log(token);
            // Check whether the token is expired and return
            // true or false
            if (this.jwtHelper.isTokenExpired(token)) {

                sessionStorage.removeItem('auth_token');
            }
            return !this.jwtHelper.isTokenExpired(token);

        }
        catch (e) {
            sessionStorage.removeItem('auth_token');
            return false;
        }
    }
}
