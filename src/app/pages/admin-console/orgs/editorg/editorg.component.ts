import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { Directive } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService, GlobalConfig, IndividualConfig, TOAST_CONFIG } from 'ngx-toastr';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';


import { FormBuilder, FormControl, FormGroup, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Org, OrgLabs, Lab, LabUsers, User, BusinessEntity } from '../org';
import { OrgService } from '../org.service';
import { ListrolesComponent } from '../listroles/listroles.component';
import { CommonService } from '../../../../shared/utils/common.service';


@Component({
    selector: 'ahs-orgseditorg',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './editorg.component.html',
    styleUrls: [
        './editorg.component.scss',
        '../../../../theme/styles/table-styling.scss',
        '../../../../theme/styles/AhsStyles.css'
    ]
})


export class EditorgComponent implements OnInit, OnDestroy {
    id: string;
    private sub: any;

    // Image related
    public image: any;
    // Image related

    public sFormFields: string = 'name,displayName,email,phone,fax,website,address1,city,zip';

    private svcORG: OrgService;
    private svcCMN: CommonService;

    public form: FormGroup;
    public businessEntityid: string;
    public name: AbstractControl;
    public displayName: AbstractControl;
    public email: AbstractControl;
    public phone: AbstractControl;
    public fax: AbstractControl;
    public website: AbstractControl;
    public address1: AbstractControl;
    public city: AbstractControl;
    public state: AbstractControl;
    public zip: AbstractControl;
    public orgDetail: Org;
    public logoImage: AbstractControl;
    public logoUrl$: string;
    options: GlobalConfig;
    loading: boolean;
    defaultLogo = 'assets/img/app/no-image.png';

    constructor(oCS: CommonService, private route: ActivatedRoute,private router: Router,
                private oOS: OrgService, fb: FormBuilder, public toastrService: ToastrService) {

        this.svcORG = oOS;
        this.svcCMN = oCS;
        this.options = this.toastrService.toastrConfig;
        this.options.positionClass = 'toast-bottom-full-width';

        this.form = fb.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(1)])],
            displayName: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            phone: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
            fax: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
            website:[''],
            address1: ['', Validators.required],
            city: ['', Validators.required],
            state: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            zip: ['', Validators.required],
            logoImage: null,
            logoUrl: '',
            enabled: false,
        });
        this.orgDetail = new Org();
    }

    ngOnInit() {
        this.loading = true;
        this.sub = this.route.parent.params.subscribe(params => {
            this.id = params['id'];
            //console.log('EditOrg. Org-Id: ' + this.id);  // xxxx remove it later
        });


        this.svcORG.getOrg(this.id).subscribe(
            (data) => {
                //console.log(data);  // xxxx remove it later
                this.businessEntityid = this.svcCMN.GetString(data.businessEntityId);
                this.form.get('name').setValue(this.svcCMN.GetString(data.businessEntity.name));
                this.form.get('displayName').setValue(this.svcCMN.GetString(data.businessEntity.displayName));
                this.form.get('email').setValue(this.svcCMN.GetString(data.businessEntity.email));
                this.form.get('phone').setValue(this.svcCMN.GetString(data.businessEntity.phone));
                this.form.get('fax').setValue(this.svcCMN.GetString(data.businessEntity.fax));
                this.form.get('website').setValue(this.svcCMN.GetString(data.businessEntity.website));
                this.form.get('address1').setValue(this.svcCMN.GetString(data.businessEntity.address1));
                this.form.get('city').setValue(this.svcCMN.GetString(data.businessEntity.city));
                this.form.get('state').setValue(this.svcCMN.GetString(data.businessEntity.state));
                this.form.get('zip').setValue(this.svcCMN.GetString(data.businessEntity.zip));
                this.logoUrl$ = this.svcCMN.GetString(data.logoUrl);
                if (!data.logoUrl)
                    this.logoUrl$ = this.defaultLogo;

                // xxxx remove following line
                //this.svcCMN.Log2Console(this.form, this.sFormFields);
                this.loading = false;
            },
            response => {
                this.toastrService.error("Failed to get org data.", '', this.options);
                this.loading = false;
            },
            () => {
                this.loading = false;
            }
        );
        this.loading = false;
    }

    
    public onSubmit(values: Object): void {
        //Log2Console(this.form);
        //Log2ConsoleOrg(this.orgDetail);
        if (this.form.valid) {
            this.loading = true;
            this.orgDetail.id = this.id;
            this.orgDetail.businessEntityId = this.businessEntityid;
            this.orgDetail.businessEntity.businessEntityId = this.businessEntityid;
            this.orgDetail.businessEntity.name = this.form.get('name').value;
            this.orgDetail.businessEntity.displayName = this.form.get('displayName').value;
            this.orgDetail.businessEntity.email = this.form.get('email').value;
            this.orgDetail.businessEntity.phone = this.form.get('phone').value;
            this.orgDetail.businessEntity.fax = this.form.get('fax').value;
            this.orgDetail.businessEntity.website = this.form.get('website').value;
            this.orgDetail.businessEntity.address1 = this.form.get('address1').value;
            this.orgDetail.businessEntity.city = this.form.get('city').value;
            this.orgDetail.businessEntity.state = this.form.get('state').value;
            this.orgDetail.businessEntity.zip = this.form.get('zip').value;
            this.orgDetail.logoImage = this.form.get('logoImage').value;
            console.log(this.orgDetail);

            this.oOS.saveOrg(this.orgDetail).subscribe(
                (val) => {
                    this.toastrService.success("Org details updated.", '', this.options);
                    this.loading = false;
                    return true;
                },
                response => {
                    //console.log("POST call in error", response);
                    this.toastrService.error("Failed to update org details.", '', this.options);
                    this.loading = false;
                },
                () => {
                    //console.log("The POST observable is now completed.");
                    this.loading = false;
                }
            );
        }
        else
            console.log("form validation failed.")
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public cancelme(e) {
        e.preventDefault();
    }

    // Image related
    fileChange(input) {
        const reader = new FileReader();
        if (input.files.length) {
            const file = input.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.image = reader.result;
                this.form.get('logoImage').setValue({
                    filename: file.name,
                    filetype: file.type,
                    value: reader.result.split(',')[1]
                });
                //console.log(this.form.get('logoImage').value);
            }
        }
    }
    removeImage(): void {
        this.image = '';
    }
    // Image related

}

export function Log2Console(oForm: FormGroup) {
    console.log('Log2Console() starts');
    if (oForm == null)
        console.log('   Form object is null.');
    else {
        console.log('   ' +oForm.get('name').value);
        console.log('   ' +oForm.get('displayName').value);
        console.log('   ' +oForm.get('email').value);
        console.log('   ' +oForm.get('phone').value);

        console.log('   ' +oForm.get('fax').value);
        console.log('   ' +oForm.get('website').value);
        console.log('   ' +oForm.get('address1').value);
        console.log('   ' +oForm.get('city').value);
        console.log('   ' +oForm.get('state').value);
        console.log('   ' +oForm.get('zip').value);
    }
    console.log('Log2Console() ends');
}

export function Log2ConsoleOrg(oOrg: Org) {
    console.log('Log2ConsoleOrg() starts');
    if (oOrg == null)
        console.log('   oOrg is null.');
    else {
        if (oOrg.businessEntity == null)
            console.log('   oOrg.businessEntity is null');
        else {
            console.log('   ' + oOrg.id);
            console.log('   ' + oOrg.businessEntityId);
            console.log('   ' + oOrg.businessEntity.businessEntityId);
            console.log('   ' + oOrg.businessEntity.name);
            console.log('   ' + oOrg.businessEntity.displayName);
            console.log('   ' + oOrg.businessEntity.email);
            console.log('   ' + oOrg.businessEntity.phone);

            console.log('   ' + oOrg.businessEntity.fax);
            console.log('   ' + oOrg.businessEntity.website);
            console.log('   ' + oOrg.businessEntity.address1);
            console.log('   ' + oOrg.businessEntity.city);
            console.log('   ' + oOrg.businessEntity.state);
            console.log('   ' + oOrg.businessEntity.zip);
        }
    }
    console.log('Log2ConsoleOrg() ends');
}
