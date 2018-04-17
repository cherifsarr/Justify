import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { User } from "../../../../shared/models/user";
import { RoleListItem } from "../../../../shared/models/rolelistitem";
import { UserService } from "../user.service";


@Component({
    selector: 'ahs-orgslistusers',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './listusers.component.html',
    styleUrls: [
        './listusers.component.scss',
        '../../../../theme/styles/table-styling.scss',
        '../../../../theme/styles/AhsStyles.css'
    ]
})
export class ListusersComponent implements OnInit,OnDestroy {
    //oid: string;    // Org-Id
    //param1: any;
    param2: any;
    userService: UserService;
    route: ActivatedRoute;

    editing = {};
    rows = [];
    temp = [];
    selected = [];

    columns = [
        { prop: 'id' },
        { name: 'userName' },
        { name: 'firstName' },
        { name: 'lastName' },
        { name: 'email' }
    ];

    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(_router: Router, _route: ActivatedRoute, _userService: UserService) {
        this.userService = _userService;
        this.route = _route;
        //this.param1 = _route.queryParams.subscribe(params => {
        //    this.oid = params['oid'];
        //    //console.log(params);
        //});
        //console.log('Parent: ' + this.oid);
    }

    ngOnInit() {
        this.param2 = this.userService.getOrgUsers().subscribe((data) => {
            let data2 = JSON.parse(JSON.stringify(data));
            this.temp = [...data2];
            this.rows = data2;
        });
        //console.log(this.oid);       
        //console.log('Snapshot: ' + this.route.snapshot.params["id"]);

    }


    ngOnDestroy() {
        //this.param1.unsubscribe();
        this.param2.unsubscribe();
    }


    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.userName.toLowerCase().indexOf(val) !== -1
                || d.firstName.toLowerCase().indexOf(val) !== -1
                || d.lastName.toLowerCase().indexOf(val) !== -1
                || d.email.toLowerCase().indexOf(val) !== -1
                || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }

}
