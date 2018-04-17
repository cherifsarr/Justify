//import { Component, OnInit } from '@angular/core';
//
//@Component({
//  selector: 'ahs-editrole',
//  templateUrl: './editrole.component.html',
//  styleUrls: ['./editrole.component.scss']
//})
//export class EditroleComponent implements OnInit {
//
//  constructor() { }
//
//  ngOnInit() {
//  }
//
//}



import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormControl, FormGroup, AbstractControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role, RoleDetail, RolePermission } from '../role';
import { RolesService } from '../roles.service';
import { AutofocusDirective } from '../../../../autofocus.directive';

@Component({
    selector: 'ahs-roleeditrole',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './editrole.component.html',
    styleUrls: ['../../../../theme/styles/table-styling.scss', '../../../../theme/styles/AhsStyles.css']
})


export class EditroleComponent implements OnInit, OnDestroy {
    id: string;
    private sub: any;

    private oRS: RolesService;
    public form: FormGroup;
    public rolename: AbstractControl;
    public orgLevel: AbstractControl;
    public labLevel: AbstractControl;
    public mpLevel: AbstractControl;
    public enabled: AbstractControl;
    public custom: AbstractControl;
    public permissions: RolePermission[];
    private roledetail: RoleDetail;


    editing = {};
    rows = [];
    temp = [];
    selected = [];

    columns = [
        { prop: 'id' },
        { prop: 'roleId' },
        { prop: 'featureId' },
        { name: 'featureName' },
        { name: 'create' },
        { name: 'read' },
        { name: 'update' },
        { name: 'delete' }
    ];
    @ViewChild(DatatableComponent) table: DatatableComponent;



    constructor(private route: ActivatedRoute, private oRolesService: RolesService, fb: FormBuilder) {
        this.oRS = oRolesService;

        this.form = fb.group({
            rolename: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            orgLevel: [''],
            labLevel: [''],
            mpLevel: [''],
            enabled: [true],
            custom: ['']
        });
        this.roledetail = new RoleDetail;
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
        });


        this.oRS.getAppRoles(this.id).subscribe((data) => {
            this.form.get('rolename').setValue(data.name);
            this.form.get('orgLevel').setValue(data.orgLevel);
            this.form.get('labLevel').setValue(data.labLevel);
            this.form.get('mpLevel').setValue(data.mpLevel);
            this.form.get('enabled').setValue(!data.enabled);
            this.form.get('custom').setValue(data.custom);

            console.log(data.permissions);
            let data2 = JSON.parse(JSON.stringify(data.permissions));
            this.temp = [...data2];
            this.rows = data2;
        });
    }


    public onSubmit(values: Object): void {
        // xxxx following block is for debugging
        console.log(this.form.get('rolename').value);
        console.log(this.form.get('orgLevel').value);
        console.log(this.form.get('labLevel').value);
        console.log(this.form.get('mpLevel').value);
        console.log(this.form.get('enabled').value);
        console.log(this.form.get('custom').value);
        // xxxx log entries from roledetail.permissions[]

        if (this.form.valid) {
            this.roledetail.name = this.form.get('rolename').value;
            this.roledetail.orgLevel = this.form.get('orgLevel').value;
            this.roledetail.labLevel = this.form.get('labLevel').value;
            this.roledetail.mpLevel = this.form.get('mpLevel').value;
            this.roledetail.enabled = this.form.get('enabled').value;
            this.roledetail.custom = this.form.get('custom').value;

            // xxxx set roledetail.permissions[] here
            this.oRS.saveRole(this.roledetail);

        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    public cancelme(e) {
        e.preventDefault();
    }
}


