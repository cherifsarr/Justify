import { Injectable } from '@angular/core';
@Injectable()

export class ConfigService {
    _apiURI: string;
    constructor() {
        this._apiURI = 'https://ahsjustifyapi.azurewebsites.net/api'; //  'http://localhost:52443/api'; // 
    }

    getApiURI() {
        return this._apiURI;
    }

}