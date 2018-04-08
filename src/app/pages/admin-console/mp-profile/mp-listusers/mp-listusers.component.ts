import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { MpUsersService } from '../services/mp-users.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
@Component({
  selector: 'ahs-mp-listusers',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mp-listusers.component.html',
  styleUrls: ['./mp-listusers.component.scss','../../../../theme/styles/table-styling.scss', '../../../../theme/styles/AhsStyles.css']
})
export class MpListusersComponent implements OnInit {
  idProfile: string;
  sub: any;
  temp = [];
  rows = [];

  columns = [
    { prop: 'id' },
    { name: 'userName' },
    { name: 'firstName' },
    { name: 'lastName' },
    { name: 'title' },
    { name: 'role' },
    { name: 'isEnabled' }
];

@ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private router: ActivatedRoute, route: Router, private mpuserService: MpUsersService) { }

  ngOnInit() {
    this.sub = this.router.parent.params.subscribe(params => {
      if (params.id) {
        console.log(params);
        this.idProfile = params.id;
        this.getListMpUsersByIdProfile(this.idProfile);
      }
    })
  }

  /**
   * 
   * @param id 
   */
  getListMpUsersByIdProfile(id){
    this.mpuserService.getMpUsersByProfileId(id).subscribe(resp=>{
              let data = JSON.parse(JSON.stringify(resp));
              this.rows =  data;
              this.temp = [...data];
    })

  }

    /**
   * Filter function
   * @param event 
   */
  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function(d) {
        return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }
}
