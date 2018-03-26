import { Injectable } from '@angular/core';
//import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';


//import { UserRegistration } from '../models/user.registration.interface';
import { ConfigService } from '../utils/config.service';

import { BaseService } from "./base.service";

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';

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

    private loggedIn = false;

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

     //   const credentials = JSON.stringify({ UserName: userName, Password: password });
     //   alert(userName);
        return this.http.post<AuthResult>(
            this.baseUrl + '/auth/login',
            strCred,
            httpOptions
        ).subscribe(

            (val) => {
              //  let result: AuthResult = JSON.parse(val.toString());
             //   console.log("POST call successful value returned in body",val.auth_token);
                sessionStorage.setItem('auth_token', val.auth_token);
                this.loggedIn = true;
                this._authNavStatusSource.next(true);
                return true;
            },
            response => {
              //  console.log("POST call in error", response);
            },
            () => {
               // console.log("The POST observable is now completed.");
            });

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
