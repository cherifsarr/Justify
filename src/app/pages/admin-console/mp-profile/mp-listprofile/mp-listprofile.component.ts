import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MPProfile } from '../../../../shared/models/mpprofile';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MPProfileService } from '../services/mp-profile.service';

@Component({
  selector: 'ahs-mp-listprofile',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mp-listprofile.component.html',
  styleUrls: ['./mp-listprofile.component.scss', '../../../../theme/styles/table-styling.scss', '../../../../theme/styles/AhsStyles.css']
})
export class MpListprofileComponent implements OnInit {
  mpProfiles: MPProfile[];
  editing = {};
  rows = [];
  temp = [];
  selected = [];
  result = [];
  columns = [
      { prop: 'id' },
      { name: 'name' },
      { name: 'address' },
      { name: 'city' },
      { name: 'phone' },
      { name: 'testRights' }
  ];
  isCreatedNew:boolean=  false;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private mpProfileService: MPProfileService) { }

  ngOnInit() {
    this.getMPProfiles();
  }
  
  /**
   * get all Medical Practice Profile
   */
  getMPProfiles() {
    this.mpProfileService.getMPProfiles()
    .subscribe(resp => { 
     // this.mpProfiles = resp;
     let data = this.populate(resp);
      this.rows =  data;
      this.temp = [...data];
    })
  }

  /**
   * Populate List
   * @param profile 
   */
  populate(profile: MPProfile[]) {
    let result = [];
    profile.forEach(element => {
      let obj:any = {
        id:element.id, 
        testRights: element.testRights,
        name: element.businessEntity.name,
        city: element.businessEntity.city,
        address: element.businessEntity.address1,
        phone: element.businessEntity.phone
      }
      result.push(obj);
    });
    return result;
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
