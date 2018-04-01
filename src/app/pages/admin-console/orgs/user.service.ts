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
import { Observable } from 'rxjs/Observable';

import { Org, OrgLabs, Lab, LabUsers, User } from './org';
import { ConfigService } from '../../../shared/utils/config.service';


@Injectable()
export class UserService {
    constructor(private http: HttpClient, private oConfigService: ConfigService) { }

    getLabs() {
        return this.http.get(this.oConfigService.getApiURI() + '/LabUsers');
    }
    getLab(id) {
        return this.http.get<Org>(this.oConfigService.getApiURI() + '/LabUsers/' + id);
    }

    saveOrg(oUser: User) {
        return this.http.post(
            this.oConfigService.getApiURI() + '/LabUsers',
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





}