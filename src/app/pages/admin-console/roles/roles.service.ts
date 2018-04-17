import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';

// Add the RxJS Observable operators we need in this app.
import 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

import { Role, RoleDetail } from './role';
import { ConfigService } from '../../../shared/utils/config.service';
import { BaseService } from "../../../shared/services/base.service";

@Injectable()
export class RolesService extends BaseService {
    baseUrl: string = '';
    constructor(private http: HttpClient, private oConfigService: ConfigService) {
        super();
        this.baseUrl = oConfigService.getApiURI();
    }

    getRoles() {
        return this.http.get(this.baseUrl + '/approles');
    }
    getAppRoles(id) {
        return this.http.get<RoleDetail>(this.baseUrl + '/AppRoles/' + id);
    }

    createRole(roledetail: RoleDetail) {
        return this.http.post(
            this.baseUrl + '/AppRoles',
            JSON.stringify(roledetail),
        );
    }

    saveRole(roledetail: RoleDetail) {
        return this.http.put(
            this.baseUrl + '/AppRoles/' + roledetail.id,
            JSON.stringify(roledetail)
        );
    }
}
