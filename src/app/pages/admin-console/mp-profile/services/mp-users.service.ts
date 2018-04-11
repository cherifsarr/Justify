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
import {User} from "../../../../shared/models/user";
import { Mplocation } from '../../../../shared/models/mplocation';
import { MPProfile } from '../../../../shared/models/mpprofile';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class MpUsersService {

  options: GlobalConfig;

  constructor(private http: HttpClient, private configService: ConfigService, public toastrService: ToastrService) {
    this.options = this.toastrService.toastrConfig;
   }

    /**
     *
     * @param MpUser
     * @returns {Observable<MpUser>}
     */
   saveMPUser(user:User):Observable<User> {
        return this.http.post<User>(this.configService.getApiURI() + '/Accounts', user)
            .pipe(
                tap(_ => this.toastrService.success("User created successfully")),
                catchError(this.handleError<User>('saveMPUser'))
            )
   }
   /**
    * Update MP User
    * @param mpUser 
    */
   updateMPUser(mpUser: User) {
        return this.http.put(this.configService.getApiURI() + '/MPUsers/'+ mpUser.id, httpOptions)
        .pipe(
          tap(_ => this.toastrService.success("User updated successfully")),
          catchError(this.handleError<User>('updateMPUser'))
        )
   }
    /**
     *
     * @param {string} idProfile
     * @returns {Observable<MpUser[]>}
     */
   getMpUsersByProfileId(idProfile: string):Observable<User[]> {
       return this.http.get<User[]>(this.configService.getApiURI() + '/MPUsers/mp/'+idProfile)
        .pipe(
          catchError(this.handleError('getMpUsersByProfileId', []))
         )
   }

    /**
     *
     * @param {string} idUser
     * @returns {Observable<User>}
     */
    getMpUserById(idUser: string):Observable<User>{
       return this.http.get<User>(this.configService.getApiURI() + '/MPUsers/' + idUser)
           .pipe(
               catchError(this.handleError<User>('getMpUserById'))
           )
    }
    /**
     *
     * @param {number} scope
     * @returns {Observable<AppRole[]>}
     */
   getRoles(scope: number): Observable<AppRole[]> {
    return this.http.get<AppRole[]>(this.configService.getApiURI() + '/AppRoles/list/' + scope)
            .pipe(
              catchError(this.handleError('getRoles', []))
             )
   }

   getRoleById(idRole: string): Observable<AppRole> {
    return this.http.get<AppRole>(this.configService.getApiURI() + '/AppRoles/' + idRole)
            .pipe(
              catchError(this.handleError<AppRole>('getRoleById'))
             )
   }

  //  getLocationById(idLocation: string) :Observable<Mplocation> {
  //   return this.http.get<Mplocation>(this.configService.getApiURI() + '/MPLocations/' + idLocation)
  //     .pipe(
  //       catchError(this.handleError<Mplocation>('getLocationById'))
  //      )
  //  }
  //  getMPProfileById(idProfile: string) :Observable<MPProfile> {
  //   return this.http.get<MPProfile>(this.configService.getApiURI() + '/MPProfiles/' + idProfile)
  //     .pipe(
  //       catchError(this.handleError<MPProfile>('getMPProfileById'))
  //      )
  //  }

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
