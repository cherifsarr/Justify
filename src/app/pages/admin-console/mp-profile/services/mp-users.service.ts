import { Injectable } from '@angular/core';
import { ConfigService } from '../../../../shared/utils/config.service';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { pipe } from 'rxjs';
import { MpUser } from '../../../../shared/models/mpuser';
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
