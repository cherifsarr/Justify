import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../utils/config.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { MPProfile } from '../models/mpprofile';
@Injectable()
export class MPProfileService {

  constructor(private http: HttpClient, private configService: ConfigService) { }
  
  getMPProfiles(): Observable<MPProfile[]> {
    return this.http.get<MPProfile[]>(this.configService.getApiURI() + '/MPProfiles')
    .pipe(
      catchError(this.handleError('getMPProfiles', []))
    );
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

        //this.log(`${operation} failed: ${error.message}`);

        return of(result as T);
    };
  }

}
