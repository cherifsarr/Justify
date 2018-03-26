import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Roledetails } from '../models/roledetails';
import { ConfigService } from '../utils/config.service';


@Injectable()
export class EditroleService {

    constructor(private http: HttpClient, private oConfigService: ConfigService) { }


    //getRoleDetails(id) {
    //    return this.http.get(this.oConfigService.getApiURI() + '/approles');
    //}
}
