import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { LabProfile } from '../../../../shared/models/lab-profile';
import { LabProfileService } from '../services/lab-profile.service';

@Component({
  selector: 'ahs-lab-profile',
   encapsulation: ViewEncapsulation.None,
  templateUrl: './lab-profile.component.html',
  styleUrls: [
    './lab-profile.component.scss',
    '../../../../theme/styles/table-styling.scss',
    '../../../../theme/styles/AhsStyles.css'
  ]
})
export class LabProfileComponent implements OnInit {
  rows = [];
  temp = [];
  columns = [
      { prop: 'id' },
      { name: 'uniqueName'},
      { name: 'billingName' },
      { name: 'billingEmail' },
      { name: 'billingPhone' },
      { name: 'state' }
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private labProfileService: LabProfileService) { }

  ngOnInit() {
    this.getAllLabProfiles();
  }
  
  /**
   * Get All Lab Profiles
   */
  getAllLabProfiles() {
    this.labProfileService.getLabProfiles()
      .subscribe(labprofiles => {
        console.log(labprofiles);
        let data = this.populate(labprofiles);
        this.rows = data;
      })
  }

  /**
   * Populate List
   * @param profile 
   */
  populate(labprofile: LabProfile[]) {
    let result = [];
    labprofile.forEach(element => {
      let obj:any = {
        id:element.id, 
        uniqueName	: element.uniqueName,
        billingName: element.billingName,
        billingEmail: element.billingEmail,
        state: element.businessEntity.state,
        billingPhone: element.billingPhone
      }
      result.push(obj);
    });
    return result;
  }
}
