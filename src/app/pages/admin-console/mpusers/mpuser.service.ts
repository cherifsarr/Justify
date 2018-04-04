import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../../../shared/utils/config.service';
import { BaseService } from "../../../shared/services/base.service";

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';

import { User } from "../../../shared/models/user";
import { RoleListItem } from "../../../shared/models/rolelistitem";

// Add the RxJS Observable operators we need in this app.
import 'rxjs/operators';


@Injectable()
export class MpuserService extends BaseService {

    baseUrl: string = '';

    constructor(private http: HttpClient, private configService: ConfigService) {
        super();

        this.baseUrl = configService.getApiURI();

    }



    createUser(user: User) {
        return this.http.post(
            this.baseUrl + '/accounts',
            JSON.stringify(user)
        ).subscribe(

            (val) => {
                //  let result: AuthResult = JSON.parse(val.toString());
            //    console.log("POST call successful value returned in body", val);
                return true;
            },
            response => {
                //  console.log("POST call in error", response);
            },
            () => {
                // console.log("The POST observable is now completed.");
            });
    }

    getMpUsers() {
        return this.http.get<User[]>(
            this.baseUrl + '/mpusers'
        );
    }


    getRoles(scope: number) {
        return this.http.get<RoleListItem[]>(
            this.baseUrl + '/approles/list/' + scope,
        );
    }

}