/*import { Injectable } from '@angular/core';


@Injectable()
export class FeaturesService {

  constructor() { }

} */


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Feature } from '../models/feature';
import { ConfigService } from '../utils/config.service';

@Injectable()
export class FeaturesService {
    constructor(private http: HttpClient, private oConfigService: ConfigService) { }

    getFeatures() {
        //alert('test');
        // return this.http.get(this.oConfigService.getApiURI()+'/features');
        return this.http.get(this.oConfigService.getApiURI() + '/features');
    }
}
