import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {

    constructor(public jwtHelper: JwtHelperService) { }
    // ...
    public isAuthenticated(): boolean {
        try {
            const token = sessionStorage.getItem('auth_token');
        //    console.log(token);
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

    public getUserClaims(): any {

        try {
            const token = sessionStorage.getItem('auth_token');
       //     var decoded = JSON.stringify(this.jwtHelper.decodeToken(token));
            return this.jwtHelper.decodeToken(token);

        }
        catch (e) {
            return '';
        }
    }
}
