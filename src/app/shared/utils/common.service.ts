import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Injectable()
export class CommonService {

    constructor() { }

    GetString(s) {
        return (s == null || s == undefined) ? '' : s;
    }

    IsNEB(s) {
        return (this.GetString(s) == '') ? true : false;
    }
    Log2Console(oForm: FormGroup, sFields: string) {
        if (this.GetString(sFields)) return;
        let aFields = sFields.split(',');
        for (let s of aFields) {
            console.log(oForm.get(s).value);
        }
    }
}
