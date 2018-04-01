//import { Injectable } from '@angular/core';
//
//@Injectable()
//export class OrgService {
//
//  constructor() { }
//
//}


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Org, OrgLabs, Lab, LabUsers, User } from './org';
import { ConfigService } from '../../../shared/utils/config.service';


@Injectable()
export class OrgService {
    constructor(private http: HttpClient, private oConfigService: ConfigService) { }

    getOrgs() {
        return this.http.get(this.oConfigService.getApiURI() + '/OrgProfiles');
    }
    getOrg(id) {
        return this.http.get<Org>(this.oConfigService.getApiURI() + '/OrgProfiles/' + id);
    }

    saveOrg(oOrg: Org) {
        return this.http.post(
            this.oConfigService.getApiURI() + '/OrgProfiles',
            JSON.stringify(oOrg)
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
