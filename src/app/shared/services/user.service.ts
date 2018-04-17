import { Injectable } from '@angular/core';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


//import { UserRegistration } from '../models/user.registration.interface';
import { ConfigService } from '../utils/config.service';

import { BaseService } from "./base.service";

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';

import { PasswordReset } from '../models/passwordReset';

// Add the RxJS Observable operators we need in this app.
import 'rxjs/operators';

/*
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
*/
const httpOptions = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
};
//.set('Content-Type', 'application/json');



interface AuthResult {
    auth_token: string,
    expires_in: number,
    id: string
}

@Injectable()

export class UserService extends BaseService {



    baseUrl: string = '';

    // Observable navItem source
    private _authNavStatusSource = new BehaviorSubject<boolean>(false);
    // Observable navItem stream
    authNavStatus$ = this._authNavStatusSource.asObservable();

    public loggedIn = false;

    constructor(private http: HttpClient, private configService: ConfigService) {
        super();
        this.loggedIn = !!sessionStorage.getItem('auth_token');
        // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
        // header component resulting in authed user nav links disappearing despite the fact user is still logged in
        this._authNavStatusSource.next(this.loggedIn);
        this.baseUrl = configService.getApiURI();
    }


    login(userName: string, password: string) {
        let strCred = '{ "username" : "' + userName + '" , "password" : "' + password + '"}'
        return this.http.post<AuthResult>(
            this.baseUrl + '/auth/login',
            strCred,
            httpOptions
        );
    }

    requestPassword(email: string) {
        let strCred = '"' + email +  '"'
        return this.http.post<any>(
            this.baseUrl + '/auth/forgotpassword',
            strCred,
            httpOptions
        );
    }

    resetPassword(model: PasswordReset) {
        return this.http.post<any>(
            this.baseUrl + '/auth/resetpassword',
            JSON.stringify(model),
            httpOptions
        );
    }

    isUserNameExists(userName: string) {
        return this.http.get<any>(
            this.baseUrl + '/Utilities/user/Exists/' + userName,
            httpOptions
        );
    }

    logout() {
        sessionStorage.removeItem('auth_token');
        this.loggedIn = false;
        this._authNavStatusSource.next(false);
    }

    isLoggedIn() {
        return this.loggedIn;
    }


}
