import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ConfigService } from '../../../../shared/utils/config.service';
import { MPProfile } from '../../../../shared/models/mpprofile';
import { pipe } from 'rxjs';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class MPProfileService {
  options: GlobalConfig;
  
  constructor(private http: HttpClient, private configService: ConfigService, public toastrService: ToastrService) {
    this.options = this.toastrService.toastrConfig;
   }
  
   /**
    * get all Medicale Practice Profile
    */
  getMPProfiles(): Observable<MPProfile[]> {
    return this.http.get<MPProfile[]>(this.configService.getApiURI() + '/MPProfiles')
    .pipe(
      catchError(this.handleError('getMPProfiles', []))
    );
  }
  
  getMPProfileById(id: string):Observable<MPProfile> {
    return this.http.get<MPProfile>(this.configService.getApiURI() + '/MPProfiles/'+id)
        .pipe(
          catchError(this.handleError<MPProfile>('getMPProfileById'))
        )
  }
  /**
   * Save MPProfile
   * @param mpProfile - MPProfile
   */
  saveMPProfile(mpProfile: MPProfile):Observable<MPProfile> {
    return this.http.post<MPProfile>(this.configService.getApiURI() + '/MPProfiles', JSON.stringify(mpProfile))
     .pipe(
       tap(_ => this.toastrService.success("Mp Profile created successfully")),
       catchError(this.handleError<MPProfile>('saveMPProfile'))
     )
  }
  /**
   * Update MP profile
   * @param mpProfile 
   */
  updateMPProfile(mpProfile: MPProfile) {
    return this.http.put(this.configService.getApiURI() + "/MPProfiles/"+mpProfile.id, mpProfile, httpOptions)
           .pipe(
            tap(_ => this.toastrService.success("Mp Profile updated successfully")),
            catchError(this.handleError<MPProfile>('updateMPProfile'))
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
