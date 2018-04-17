import { FormGroup } from '@angular/forms';
export class Common {
    IsNEB(s) {
        return (s == null || s == undefined) ? '' : s;
    }

    Log2Console(oForm: FormGroup, sFields: string) {
        if (this.IsNEB(sFields)) return;
        let aFields = sFields.split(',');
        for (let s of aFields) {
            console.log(oForm.get(s).value);
        }
    }
}
