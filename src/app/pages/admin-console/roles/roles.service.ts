//import { Injectable } from '@angular/core';
//
//@Injectable()
//export class RolesService {
//
//  constructor() { }
//
//}
//


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Role, RoleDetail } from './role';
import { ConfigService } from '../../../shared/utils/config.service';


@Injectable()
export class RolesService {
    constructor(private http: HttpClient, private oConfigService: ConfigService) { }

    getRoles() {
        return this.http.get(this.oConfigService.getApiURI() + '/approles');
    }
    getAppRoles(id) {
        return this.http.get<RoleDetail>(this.oConfigService.getApiURI() + '/AppRoles/' + id);
    }

    saveRole(roledetail: RoleDetail) {
        return this.http.post(
            this.oConfigService.getApiURI() + '/RoleDetail',
            JSON.stringify(roledetail)
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

}
