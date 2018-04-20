import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LabProfile } from '../../../../shared/models/lab-profile';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { ConfigService } from '../../../../shared/utils/config.service';
import { pipe } from 'rxjs';
@Injectable()
export class LabProfileService {
  constructor(private http: HttpClient, private configService:ConfigService) { }
  
  /**
   * Get all Lab Profiles
   */
  getLabProfiles(orgId: string): Observable<LabProfile[]> {
    return this.http.get<LabProfile[]>(this.configService.getApiURI() + "/LabProfiles/org/" +orgId)
            .pipe(
              catchError(this.handleError('getLabProfiles', []))
            );
  }

    /**
     * Get Org Profile Id
     */
    getOrgProfileId() {
        return this.http.get(this.configService.getApiURI() + '/Utilities/config/default/orgprofileId')
            .pipe(
                catchError(this.handleError('getOrgProfileId'))
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
       // console.log(error);

        //this.log(`${operation} failed: ${error.message}`);

        return of(result as T);
    };
  }
}
