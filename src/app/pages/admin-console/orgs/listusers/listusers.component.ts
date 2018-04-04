//import { Component, OnInit } from '@angular/core';
//
//@Component({
//  selector: 'ahs-listorgusers',
//  templateUrl: './listusers.component.html',
//  styleUrls: ['./listusers.component.scss']
//})
//export class ListusersComponent implements OnInit {
//
//  constructor() { }
//
//  ngOnInit() {
//  }
//
//}


import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { User } from "../../../../shared/models/user";
import { RoleListItem } from "../../../../shared/models/rolelistitem";
import {UserService } from "../user.service";


@Component({
    selector: 'ahs-listorguser',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './listusers.component.html',
    styleUrls: ['./listusers.component.scss', '../../../../theme/styles/table-styling.scss', '../../../../theme/styles/AhsStyles.css']
})
export class ListusersComponent implements OnInit {

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

    constructor(router: Router, route: ActivatedRoute, private userService: UserService) { }

    ngOnInit() {
        this.userService.getOrgUsers()
            .subscribe(

            (data) => {
                let data2 = JSON.parse(JSON.stringify(data));
                this.temp = [...data2];
                this.rows = data2;
            });

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
