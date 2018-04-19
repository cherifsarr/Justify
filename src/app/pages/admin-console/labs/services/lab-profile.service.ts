import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { pipe } from 'rxjs';
import { ConfigService } from '../../../../shared/utils/config.service';
import { LabProfile } from '../../../../shared/models/lab-profile';
import { ToastrService, GlobalConfig, IndividualConfig, TOAST_CONFIG } from 'ngx-toastr';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LabProfileService {
  options: GlobalConfig;
  constructor(private http: HttpClient, private configService: ConfigService, public toastrService: ToastrService) {
    this.options = this.toastrService.toastrConfig;
    this.options.positionClass = 'toast-bottom-full-width';
   }

  /**
   * Get all Lab Profiles
   */
  getLabProfiles(): Observable<LabProfile[]> {
    return this.http.get<LabProfile[]>(this.configService.getApiURI() + "/LabProfiles/org/"+'680b4638-e23c-4bd6-72cd-08d58e2d9e43')
            .pipe(
              catchError(this.handleError('getLabProfiles', []))
            );
  }
  
  /**
   * Get LabProfile by id
   * @param idLab - laProfileId
   */
  getLabProfileById(idLab: string): Observable<LabProfile> {
    return this.http.get<LabProfile>(this.configService.getApiURI() + '/LabProfiles/'+idLab)
    .pipe(
      catchError(this.handleError<LabProfile>('getLabProfileById'))
    ) 
  }

   /**
   * Save Lab Profile
   * @param labProfile - LabProfile
   */
  saveLabProfile(labProfile: LabProfile):Observable<LabProfile> {
    return this.http.post<LabProfile>(this.configService.getApiURI() + '/LabProfiles', JSON.stringify(labProfile))
     .pipe(
       tap(_ => this.toastrService.success("Lab Profile created successfully")),
       catchError(this.handleError<LabProfile>('saveLabProfile'))
     )
  }

    /**
   * Update Lab Profile
   * @param labProfile 
   */
  updateLabProfile(labProfile: LabProfile) {
    return this.http.put(this.configService.getApiURI() + "/LabProfiles/"+labProfile.id, labProfile, httpOptions)
           .pipe(
            tap(_ => this.toastrService.success("Lab Profile updated successfully")),
            catchError(this.handleError<LabProfile>('updateLabProfile'))
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

       this.toastrService.error(`${operation} failed: ${error.statusText}, status:${error.status}`);

        return of(result as T);
    };
  }

}
