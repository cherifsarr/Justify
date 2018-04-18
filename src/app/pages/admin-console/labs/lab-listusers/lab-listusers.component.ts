import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {ActivatedRoute, Router} from "@angular/router";
import {LabUsersService} from "../services/lab-users.service";
import {LabUserService} from "../../lab-users/lab-user.service";

@Component({
  selector: 'ahs-lab-listusers',
  templateUrl: './lab-listusers.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./lab-listusers.component.scss', '../../../../theme/styles/table-styling.scss', '../../../../theme/styles/AhsStyles.css']
})
export class LabListusersComponent implements OnInit {

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

  constructor(router: Router, route: ActivatedRoute,
              private userService: LabUsersService) {


  }

  ngOnInit() {
    this.userService.getLabUsers()
        .subscribe(resp =>{
            let data2 = JSON.parse(JSON.stringify(resp));
            this.temp = [...data2];
            this.rows = data2;
        })
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
