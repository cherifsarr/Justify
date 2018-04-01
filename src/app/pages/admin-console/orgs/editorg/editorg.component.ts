//import { Component, OnInit } from '@angular/core';
//
//@Component({
//  selector: 'ahs-editorg',
//  templateUrl: './editorg.component.html',
//  styleUrls: ['./editorg.component.scss']
//})
//export class EditorgComponent implements OnInit {
//
//  constructor() { }
//
//  ngOnInit() {
//  }
//
//}



import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, NgModule } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Org, OrgLabs, Lab, LabUsers, User } from '../org';
import { OrgService } from '../org.service';
import { importType } from '@angular/compiler/src/output/output_ast';
import { ListrolesComponent } from '../listroles/listroles.component';

//import { RolesModule } from '../../roles/roles.module';
//import { ListrolesComponent } from '../../roles/listroles/listroles.component';


@Component({
    selector: 'az-dynamic-tables',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './editorg.component.html',
    styleUrls: ['../../../../theme/styles/table-styling.scss', '../../../../theme/styles/AhsStyles.css']
})



export class EditorgComponent implements OnInit, OnDestroy {
    id: string;
    private sub: any;

    private oOrgService: OrgService;
    public form: FormGroup;
    public name: AbstractControl;
    public displayName: AbstractControl;
    public contactName: AbstractControl;
    public email: AbstractControl;
    public phone: AbstractControl;
    public fax: AbstractControl;
    public website: AbstractControl;
    public address1: AbstractControl;
    public address2: AbstractControl;
    public city: AbstractControl;
    public state: AbstractControl;
    public zip: AbstractControl;
    public country: AbstractControl;
    public createdAt: string;
    public createdBy: string;
    private orgDetail: Org;

    constructor(private route: ActivatedRoute, private oOS: OrgService, fb: FormBuilder) {
        this.oOrgService = oOS;

        this.form = fb.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            displayName: ['', Validators.required],
            contactName: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            fax: ['', Validators.required],
            website:[''],
            address1: ['', Validators.required],
            address2: [''],
            city: ['', Validators.required],
            state: ['', Validators.required],
            zip: ['', Validators.required],
            country: [''],
            enabled: ['']
        });
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
        });


        this.oOrgService.getOrg(this.id).subscribe((data) => {
            //console.log(data);
            this.form.get('name').setValue(IsNEB(data.businessEntity.name));
            this.form.get('displayName').setValue(IsNEB(data.businessEntity.displayName));
            this.form.get('contactName').setValue(IsNEB(data.businessEntity.contactName));
            this.form.get('email').setValue(IsNEB(data.businessEntity.email));
            this.form.get('phone').setValue(IsNEB(data.businessEntity.phone));
            this.form.get('fax').setValue(IsNEB(data.businessEntity.fax));
            this.form.get('website').setValue(IsNEB(data.businessEntity.website));
            this.form.get('address1').setValue(IsNEB(data.businessEntity.address1));
            this.form.get('address2').setValue(IsNEB(data.businessEntity.address2));
            this.form.get('city').setValue(IsNEB(data.businessEntity.city));
            this.form.get('state').setValue(IsNEB(data.businessEntity.state));
            this.form.get('zip').setValue(IsNEB(data.businessEntity.zip));
            this.form.get('country').setValue(IsNEB(data.businessEntity.country));
            this.createdAt = IsNEB(data.businessEntity.createdAt);
            this.createdBy = IsNEB(data.businessEntity.createdBy);
            Log2Console(this.form);
        });
        //Log2Console();
    }

    
    public onSubmit(values: Object): void {
        if (this.form.valid) {
            this.orgDetail.businessEntity.name = this.form.get('name').value;
            this.orgDetail.businessEntity.displayName = this.form.get('displayName').value;
            this.orgDetail.businessEntity.contactName = this.form.get('contactName').value;
            this.orgDetail.businessEntity.email = this.form.get('email').value;
            this.orgDetail.businessEntity.phone = this.form.get('phone').value;
            this.orgDetail.businessEntity.fax = this.form.get('fax').value;
            this.orgDetail.businessEntity.website = this.form.get('website').value;
            this.orgDetail.businessEntity.address1 = this.form.get('address1').value;
            this.orgDetail.businessEntity.address2 = this.form.get('address2').value;
            this.orgDetail.businessEntity.city = this.form.get('city').value;
            this.orgDetail.businessEntity.state = this.form.get('state').value;
            this.orgDetail.businessEntity.zip = this.form.get('zip').value;
            this.orgDetail.businessEntity.country = this.form.get('country').value;
            this.orgDetail.businessEntity.createdAt = this.form.get('createdAt').value;
            this.orgDetail.businessEntity.createdBy = this.form.get('createdBy').value;

            this.oOS.saveOrg(this.orgDetail);
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public cancelme(e) {
        e.preventDefault();
    }
}

export function IsNEB(s) {
    return (s == null || s == undefined) ? '' : s;
}

export function Log2Console(oForm: FormGroup) {
    // xxxx following block is for debugging
    console.log(oForm.get('name').value);
    console.log(oForm.get('displayName').value);
    console.log(oForm.get('contactName').value);
    console.log(oForm.get('email').value);
    console.log(oForm.get('phone').value);

    console.log(oForm.get('fax').value);
    console.log(oForm.get('website').value);
    console.log(oForm.get('address1').value);
    console.log(oForm.get('address2').value);
    console.log(oForm.get('city').value);
    console.log(oForm.get('state').value);
    console.log(oForm.get('zip').value);
    console.log(oForm.get('country').value);
    //console.log(this.form.get('createdAt').value);
    //console.log(this.form.get('createdBy').value);
}

