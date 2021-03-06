import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfigService} from "../../../../shared/utils/config.service";
import {GlobalConfig, ToastrService} from "ngx-toastr";
import {User} from "../../../../shared/models/user";
import {Observable} from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import {catchError, tap} from "rxjs/operators";
import {RoleListItem} from "../../../../shared/models/rolelistitem";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LabUsersService {
    options: GlobalConfig;
  constructor(private http: HttpClient, private configService: ConfigService, public toastrService: ToastrService) {
      this.options = this.toastrService.toastrConfig;
      this.options.positionClass = 'toast-bottom-full-width';
  }

    /**
     *
     * @returns {Observable<User[]>}
     */
    getLabUsers(id: string): Observable<User[]> {
        return this.http.get<User[]>(this.configService.getApiURI() + '/labusers/lab/' + id)
                .pipe(
                    catchError(this.handleError('getLabUsers', []))
                );
    }

    /**
     *
     * @param {string} id
     * @returns {Observable<User>}
     */
    getUserLabById(idUser: string): Observable<User>{
        return this.http.get<User>(this.configService.getApiURI() + '/labusers/' + idUser)
            .pipe(
                catchError(this.handleError<User>('getLabProfileById'))
            )
    }

    /**
     *
     * @param {number} scope
     * @returns {Observable<Object>}
     */
    getRoles(scope: number) {
        return this.http.get<RoleListItem[]>(
            this.configService.getApiURI() + '/approles/list/' + scope,
        );
    }

    /**
     *
     * @param {User} labUser
     * @returns {Observable<User>}
     */
    saveLabUser(labUser: User):Observable<User> {
        return this.http.post<User>(this.configService.getApiURI() + '/Accounts', JSON.stringify(labUser))
            .pipe(
                tap(_ => this.toastrService.success("User Lab created successfully")),
                catchError(this.handleError<User>('saveLabUser'))
            )
    }

    /**
     * Update Lab User
     * @param user
     */
    updateLabUser(user: User){
        return this.http.put(this.configService.getApiURI() + '/LabUsers/'+ user.id, user, httpOptions)
            .pipe(
                tap(_ => this.toastrService.success("User updated successfully")),
                catchError(this.handleError<User>('updateLabUser'))
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
