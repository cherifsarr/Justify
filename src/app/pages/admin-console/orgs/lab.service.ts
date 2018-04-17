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

// Add the RxJS Observable operators we need in this app.
import 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Org, OrgLabs, Lab, LabUsers, User } from './org';
import { ConfigService } from '../../../shared/utils/config.service';
import { BaseService } from "../../../shared/services/base.service";

@Injectable()
export class LabService extends BaseService {
    baseUrl: string = '';

    constructor(private http: HttpClient, private oConfigService: ConfigService) {
        super();
        this.baseUrl = oConfigService.getApiURI();
    }

    getLabs() {
        return this.http.get(this.oConfigService.getApiURI() + '/LabProfiles');
    }
    getLab(id) {
        return this.http.get<Org>(this.baseUrl + '/LabProfiles/' + id);
    }

    saveOrg(oLab: Lab) {
        return this.http.post(
            this.baseUrl + '/LabProfiles',
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