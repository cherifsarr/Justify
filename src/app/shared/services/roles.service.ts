/*import { Injectable } from '@angular/core';

@Injectable()
export class RolesService {

  constructor() { }

}
*/


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Role } from '../models/role';
import { ConfigService } from '../utils/config.service';

@Injectable()
export class RolesService {
    constructor(private http: HttpClient, private oConfigService: ConfigService) { }

    getRoles() {
        return this.http.get(this.oConfigService.getApiURI() + '/approles');
    }
}
