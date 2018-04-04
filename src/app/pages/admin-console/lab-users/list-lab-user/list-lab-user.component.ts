import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';

import { User } from "../../../../shared/models/user";
import { RoleListItem } from "../../../../shared/models/rolelistitem";
import { LabUserService } from "../lab-user.service";


@Component({
    selector: 'ahs-list-lab-user',
    templateUrl: './list-lab-user.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./list-lab-user.component.scss', '../../../../theme/styles/table-styling.scss', '../../../../theme/styles/AhsStyles.css']
})
export class ListLabUserComponent implements OnInit {

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

    constructor(router: Router, route: ActivatedRoute, private userService: LabUserService) { }

    ngOnInit() {
        this.userService.getLabUsers()
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
