//import { Injectable } from '@angular/core';
//
//@Injectable()
//export class LabService {
//
//  constructor() { }
//
//}
//
//


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Org, OrgLabs, Lab, LabUsers, User } from './org';
import { ConfigService } from '../../../shared/utils/config.service';


@Injectable()
export class LabService {
    constructor(private http: HttpClient, private oConfigService: ConfigService) { }

    getLabs() {
        return this.http.get(this.oConfigService.getApiURI() + '/LabProfiles');
    }
    getLab(id) {
        return this.http.get<Org>(this.oConfigService.getApiURI() + '/LabProfiles/' + id);
    }

    saveOrg(oLab: Lab) {
        return this.http.post(
            this.oConfigService.getApiURI() + '/LabProfiles',
            JSON.stringify(oLab)
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