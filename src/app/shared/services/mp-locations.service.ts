import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "../utils/config.service";
import {Mplocation} from "../models/mplocation";
import {catchError} from "rxjs/operators";

@Injectable()
export class MpLocationsService {

    private url:string = '/MPLocations';

    constructor(private http: HttpClient, private configService: ConfigService) {}

    /**
     * Return the Medical Practices List
     *
     * @returns {Observable<MPLocation[]>}
     */
    getMPLocations():Observable<Mplocation[]> {
        return this.http.get<Mplocation[]>(this.configService.getApiURI() + this.url)
            .pipe(
                catchError(this.handleError('getMPLocations', []))
            );
    }

    createLocation(location: Mplocation){
        return this.http.post(
            this.configService.getApiURI() + '/MPLocations',
            JSON.stringify(location)
        ).subscribe(
            (val) => {
                return true;
            },
            response => {
                //  console.log("POST call in error", response);
            },
            () => {
                // console.log("The POST observable is now completed.");
            });
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
