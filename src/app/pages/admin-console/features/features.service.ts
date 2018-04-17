//import { Injectable } from '@angular/core';
//
//@Injectable()
//export class FeaturesService {
//
//  constructor() { }
//
//}


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// Add the RxJS Observable operators we need in this app.
import 'rxjs/operators';
import { Feature } from './feature';
import { ConfigService } from '../../../shared/utils/config.service';
import { BaseService } from "../../../shared/services/base.service";

@Injectable()
export class FeaturesService extends BaseService {
    baseUrl: string = '';
    constructor(private http: HttpClient, private oConfigService: ConfigService) {
        super();
        this.baseUrl = oConfigService.getApiURI();
    }

    getFeatures() {
        return this.http.get(this.baseUrl + '/features');
    }
}