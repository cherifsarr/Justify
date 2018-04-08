import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../shared/utils/config.service';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { pipe } from 'rxjs';
import { MpUser } from '../../../../shared/models/mpuser';
import { AppRole } from '../../../../shared/models/appRole';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class MpUsersService {
  options: GlobalConfig;
  constructor(private http: HttpClient, private configService: ConfigService, public toastrService: ToastrService) {
    this.options = this.toastrService.toastrConfig;
   }
    
   getMpUsersByProfileId(idProfile: string):Observable<MpUser[]> {
       return this.http.get<MpUser[]>(this.configService.getApiURI() + '/MPUsers/mp/'+idProfile)
        .pipe(
          catchError(this.handleError('getMpUsersByProfileId', []))
         )
   }

   getRoles(scope: number): Observable<AppRole[]> {
    return this.http.get<AppRole[]>(this.configService.getApiURI() + '/AppRoles/list/' + scope)
            .pipe(
              catchError(this.handleError('getRoles', []))
             )
   }
    /**
   * Handle the http operation that failed
   * Let the app continue
   * @param operation  name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        console.log(error);

        this.toastrService.error(`${operation} failed: ${error.message}`);

        return of(result as T);
    };
  }
}
