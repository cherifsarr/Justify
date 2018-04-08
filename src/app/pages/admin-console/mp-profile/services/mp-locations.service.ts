import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import { pipe } from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import { ConfigService } from '../../../../shared/utils/config.service';
import { Mplocation } from '../../../../shared/models/mplocation';
import {ToastrService} from "ngx-toastr";
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
@Injectable()
export class MpLocationsService {

    private url:string = '/MPLocations/profile/';

    constructor(private http: HttpClient, private configService: ConfigService, public toastrService: ToastrService) {}

    /**
     * Return the Medical Practices List
     *
     * @returns {Observable<MPLocation[]>}
     */
    getMPLocationsByIdProfil(id: string ):Observable<Mplocation[]> {
        return this.http.get<Mplocation[]>(this.configService.getApiURI() + this.url + id)
            .pipe(
                catchError(this.handleError('getMPLocations', []))
            );
    }

    getMPLocationById(id: string):Observable<Mplocation>{
        return this.http.get<Mplocation>(this.configService.getApiURI() + '/MPLocations/' + id)
            .pipe(
                catchError(this.handleError<Mplocation>('getMPLocationById'))
            )

    }

    /**
     *
     * @param {Mplocation} location
     * @returns {Observable<Mplocation | any>}
     */
    createLocation(location: Mplocation){

        return this.http.post(
            this.configService.getApiURI() + '/MPLocations',
            JSON.stringify(location))
                .pipe(
                    tap(_ => this.toastrService.success("Location created")),
                    catchError(this.handleError<Mplocation>('createLocation'))
                )
    }
    updateLocation(mpLocation: Mplocation) {
        return this.http.put(this.configService.getApiURI() + '/MPLocations/'+ mpLocation.id, mpLocation, httpOptions)
        .pipe(
            tap(_ => this.toastrService.success("Location updated successfully")),
            catchError(this.handleError<Mplocation>('updateLocation'))
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
