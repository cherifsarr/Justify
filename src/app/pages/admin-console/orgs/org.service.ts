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

// Add the RxJS Observable operators we need in this app.
import 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Org, OrgLabs, Lab, LabUsers, User } from './org';
import { ConfigService } from '../../../shared/utils/config.service';
import { BaseService } from "../../../shared/services/base.service";

@Injectable()
export class OrgService extends BaseService {
    baseUrl: string = '';
    constructor(private http: HttpClient, private oConfigService: ConfigService) {
        super();
        this.baseUrl = oConfigService.getApiURI();
    }

    getOrgs() {
        return this.http.get(this.baseUrl + '/OrgProfiles');
    }
    getOrg(id) {
        return this.http.get<Org>(this.baseUrl + '/OrgProfiles/' + id);
    }

    /*saveOrg(oOrg: Org) {
        console.log(JSON.stringify(oOrg));
        return this.http.post(
            this.baseUrl + '/OrgProfiles',
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
    }*/

    saveOrg(oOrg: Org) {
        console.log(JSON.stringify(oOrg));
        if (oOrg.id == '') {
            return this.http.post(
                this.baseUrl + '/OrgProfiles',
                JSON.stringify(oOrg)
            );
        }
        else {
            return this.http.put(
                this.baseUrl + '/OrgProfiles/' + oOrg.id,
                JSON.stringify(oOrg)
            );

        }
    }
}
