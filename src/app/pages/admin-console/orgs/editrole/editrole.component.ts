import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { DatatableComponent } from '@swimlane/ngx-datatable';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { ToastrService, GlobalConfig, IndividualConfig, TOAST_CONFIG } from 'ngx-toastr';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

import { Role, RoleDetail, RolePermission } from '../../roles/role';
import { RolesService } from '../../roles/roles.service';
import { CommonService } from '../../../../shared/utils/common.service';
import { FeaturesService } from '../../features/features.service';
import { Permission } from '../../../../shared/models/permission';
import { Feature } from '../../../../shared/models/feature';


@Component({
    selector: 'ahs-orgseditrole',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './editrole.component.html',
    styleUrls: [
        '../../../../theme/styles/table-styling.scss',
        '../../../../theme/styles/AhsStyles.css'
    ],
})


export class EditroleComponent implements OnInit, OnDestroy {
    id: string;
    private sub: any;

    public sFormFields: string = 'rolename,orgLevel,labLevel,mpLevel,enabled,custom';

    private svcROLES: RolesService;
    private svcCMN: CommonService;
    private svcFS: FeaturesService;

    public form: FormGroup;
    public businessProfileId: AbstractControl;
    public rolename: AbstractControl;
    public orgLevel: AbstractControl;
    public labLevel: AbstractControl;
    public mpLevel: AbstractControl;
    public enabled: AbstractControl;
    public custom: AbstractControl;
    bIsCustom: boolean;
    private roledetail: RoleDetail;
    options: GlobalConfig;
    loading: boolean;

    editing = {};
    rows = [];
    temp: Permission[] = [];
    selected = [];
    allFeatures: Feature[] = [];
    aFeaturesToRemove = [];
    //messages = { emptyMessage: '' }

    columns = [
        { prop: 'featureCode'},
        { name: 'featureName' },
        { name: 'create' },
        { name: 'read' },
        { name: 'update' },
        { name: 'delete' }
    ];
    @ViewChild(DatatableComponent) table: DatatableComponent;



    constructor(oCS: CommonService, private router: Router, private route: ActivatedRoute,
        private oRS: RolesService, private oFS: FeaturesService, fb: FormBuilder,
        public toastrService: ToastrService)
    {
        this.svcROLES = oRS;
        this.svcCMN = oCS;
        this.svcFS = oFS;
        this.options = this.toastrService.toastrConfig;
        this.options.positionClass = 'toast-bottom-full-width';

        this.form = fb.group({
            rolename: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            orgLevel: false,
            labLevel: false,
            mpLevel: false,
            enabled: true,
            custom: true
        });
        this.roledetail = new RoleDetail();
    }

    ngOnInit() {
        this.bIsCustom = true;
        this.loading = true;
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.businessProfileId = this.svcCMN.GetString(sessionStorage.getItem('OrgId'));
        //console.log('RoleId: ' + this.id);  // xxxx
        //console.log('businessProfileId: ' + this.businessProfileId);    // xxxx


        this.svcFS.getFeatures().subscribe(
            (data) => {
                let dataFeatures = JSON.parse(JSON.stringify(data));
                this.allFeatures = [...dataFeatures];
            },
            response => {
                this.toastrService.error("Failed to get features data.", '', this.options);
            },
            () => {
                //console.log(this.allFeatures);
            }
        );


        if (this.id === '') {
            this.form.get('enabled').setValue(false);
            this.form.get('custom').setValue('true');
            this.loading = false;
        }
        else {
            this.svcROLES.getAppRoles(this.id).subscribe(
                (data) => {
                    this.form.get('rolename').setValue(this.svcCMN.GetString(data.name));
                    this.form.get('orgLevel').setValue(this.svcCMN.GetString(data.orgLevel));
                    this.form.get('labLevel').setValue(this.svcCMN.GetString(data.labLevel));
                    this.form.get('mpLevel').setValue(this.svcCMN.GetString(data.mpLevel));
                    //this.form.get('enabled').setValue(this.svcCMN.GetString(!data.enabled));
                    //this.form.get('custom').setValue(this.svcCMN.GetString(data.custom));
                    this.form.get('enabled').setValue(!data.enabled);
                    this.form.get('custom').setValue(data.custom);
                    this.bIsCustom = data.custom;

                    // console.log(data.permissions);
                    if (data.permissions) {
                        let data2 = JSON.parse(JSON.stringify(data.permissions));
                        this.temp = [...data2];
                        this.rows = data2;
                    }
                    if (!this.bIsCustom)
                        this.form.disable();
                    this.loading = false;
                },
                response => {
                    this.toastrService.error("Failed to get roles data.", '', this.options);
                    this.loading = false;
                },
                () => {
                    this.loading = false;
                }
            );
        }
    }


    public onscopeClicked(event, nScope) {
        let bOrg = false, bLab = false, bMP = false, nCount = 0, nIndx = -1;
        let sFld = this.MakeLower(event.srcElement.id);
        if (sFld === '') return;

        if (sFld === 'orglevel') {
            bOrg = event.srcElement.checked;
            bLab = this.form.get('labLevel').value;
            bMP = this.form.get('mpLevel').value;
        }
        else if (sFld === 'lablevel') {
            bOrg = this.form.get('orgLevel').value;
            bLab = event.srcElement.checked;
            bMP = this.form.get('mpLevel').value;
        }
        else if (sFld === 'mplevel') {
            bOrg = this.form.get('orgLevel').value;
            bLab = this.form.get('labLevel').value;
            bMP = event.srcElement.checked;
        }

        if (!bOrg && !bLab && !bMP) {
            if (sFld === 'orglevel') this.form.get('orgLevel').setValue(this.svcCMN.GetString('true'));
            else if (sFld === 'lablevel') this.form.get('labLevel').setValue(this.svcCMN.GetString('true'));
            else if (sFld === 'mplevel') this.form.get('mpLevel').setValue(this.svcCMN.GetString('true'));
            this.toastrService.error("One of the option needs to be selected.", '', this.options);
        }
        else {
            this.aFeaturesToRemove = [];
            this.allFeatures.forEach((f) => {
                if (!((bMP && f.mpLevel) || (bLab && f.labLevel) || (bOrg && f.orgLevel))) {
                    if (this.aFeaturesToRemove.indexOf(f.id) == -1) this.aFeaturesToRemove.push(f.id);
                }
            });

            this.temp = [...this.rows];
            this.allFeatures.forEach((f) => {
                if ((nScope === 1 && f.mpLevel) || (nScope === 2 && f.labLevel) || (nScope === 4 && f.orgLevel)) {
                    if (event.srcElement.checked) {
                        if (!this.ObjExists(f.id)) {
                            let p = new Permission();
                            p.roleId = this.id; p.featureId = f.id;
                            p.featureCode = f.code; p.featureName = f.name;
                            p.create = p.read = p.update = p.delete = false;
                            this.temp.push(p);
                        }
                    }
                    else {
                        this.aFeaturesToRemove.forEach((f2r) => {
                            this.RemoveEntry(f2r);
                        });
                    }
                }
            });
        }
        this.rows = [...this.temp];
    }
    public ObjExists(sId: string): boolean {
        for (let i = 0; i < this.temp.length; i++) {
            if (this.temp[i].featureId === sId) return true;
        }
        return false;
    }
    public RemoveEntry(sId: string) {
        for (let i = 0; i < this.temp.length; i++) {
            if (this.temp[i].featureId === sId) { this.temp.splice(i, 1); return true;}
        }
    }
    public LogTemp() {
        for (let i = 0; i < this.temp.length; i++) { console.log(this.temp[i]); }
    }
    public onpermissionClicked(event, rowId) {
        let bVal = event.currentTarget.checked;
        let fldName = event.currentTarget.name;
        if (event.currentTarget.name.indexOf('create_') >= 0)
            this.temp[rowId].create = bVal;
        else if (event.currentTarget.name.indexOf('read_') >= 0)
            this.temp[rowId].read = bVal;
        else if (event.currentTarget.name.indexOf('update_') >= 0)
            this.temp[rowId].update = bVal;
        else if (event.currentTarget.name.indexOf('delete_') >= 0)
            this.temp[rowId].delete = bVal;
        this.rows = [...this.temp];
    }


    public onSubmit(values: Object): void {
        if (this.form.valid) {
            this.loading = true;
            this.roledetail.id = this.id;
            this.roledetail.name = this.form.get('rolename').value;
            this.roledetail.orgLevel = this.form.get('orgLevel').value;
            this.roledetail.labLevel = this.form.get('labLevel').value;
            this.roledetail.mpLevel = this.form.get('mpLevel').value;
            this.roledetail.enabled = !this.form.get('enabled').value;
            this.roledetail.custom = this.form.get('custom').value;
            this.roledetail.permissions = this.temp;

            console.log(JSON.stringify(this.roledetail)); // xxxx
            if (this.id === '') {
                this.svcROLES.createRole(this.roledetail).subscribe(
                    (val) => {
                        this.toastrService.success("New role created.", '', this.options);
                        this.form.reset();
                        this.temp = [];
                        this.rows = [...this.temp];
                        this.loading = false;
                    },
                    (response: HttpErrorResponse) => {
                        this.toastrService.error("Failed to create role.", '', this.options);
                        this.loading = false;
                    },
                    () => {
                        this.loading = false;
                    }
                );
            }
            else {
                this.svcROLES.saveRole(this.roledetail).subscribe(
                    (val) => {
                        this.toastrService.success("Role details updated.", '', this.options);
                        this.loading = false;
                    },
                    (response: HttpErrorResponse) => {
                        this.toastrService.error("Failed to update role details.", '', this.options);
                        this.loading = false;
                    },
                    () => {
                        this.loading = false;
                    }
                );
            }
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public cancelme(e) {
        this.router.navigate(['../listroles']);
        e.preventDefault();
    }
    public MakeLower(s: string) {
        if (s === undefined || s === null || s === '')
            return '';
        return s.toLowerCase();
    }
}
