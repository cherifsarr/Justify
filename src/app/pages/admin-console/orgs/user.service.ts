//import { Injectable } from '@angular/core';
//
//@Injectable()
//export class UserService {
//
//  constructor() { }
//
//}
//

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';

// Add the RxJS Observable operators we need in this app.
import 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Org, OrgLabs, Lab, LabUsers } from './org';
import { User } from "../../../shared/models/user";
import { ConfigService } from '../../../shared/utils/config.service';
import { BaseService } from "../../../shared/services/base.service";

@Injectable()
export class UserService extends BaseService {
    baseUrl: string = '';
    constructor(private http: HttpClient, private oConfigService: ConfigService) {
        super();
        this.baseUrl = oConfigService.getApiURI();
    }

    getLabs() {
        return this.http.get(this.baseUrl + '/LabUsers');
    }
    getLab(id) {
        return this.http.get<Org>(this.baseUrl + '/LabUsers/' + id);
    }

    saveOrg(oUser: User) {
        return this.http.post(
            this.baseUrl + '/LabUsers',
            JSON.stringify(oUser)
        ).subscribe(

            (val) => {
                return true;
            },
            response => {
                //  console.log("POST call in error", response);
            },
            () => {
                // console.log("The POST observable is now completed.");
            });
    }




    createUser(user: User) {
        return this.http.post(
            this.oConfigService.getApiURI() + '/accounts',
            JSON.stringify(user),
        );
    }

    getOrgUsers() {
        return this.http.get<User[]>(
            this.oConfigService.getApiURI() + '/orgusers'
        );
    }

    isUserNameExists(userName: string): Promise<boolean> {
        return this.http.get<boolean>(
            this.baseUrl + '/Utilities/user/Exists/' + userName,
        ).toPromise();
    }
}