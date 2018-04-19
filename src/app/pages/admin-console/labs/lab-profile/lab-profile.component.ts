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
  orgProfileId: string;
  columns = [
      { prop: 'id' },
      { name: 'name'},
      { name: 'contactName' },
      { name: 'phone' },
      { name: 'City' },
      { name: 'state' }
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private labProfileService: LabProfileService) { }

  ngOnInit() {
    this.getAllLabProfilesByOrg();
  }
  
  /**
   * Get All Lab Profiles
   */
  getAllLabProfilesByOrg() {
    this.labProfileService.getOrgProfileId()
      .subscribe(
          (resp: string) => {this.orgProfileId = resp},
          () => {},
          () => {
            this.labProfileService.getLabProfiles(this.orgProfileId)
            .subscribe(labprofiles => {
              console.log(labprofiles);
            //  let data = this.populate(labprofiles);
              this.rows = labprofiles;
            })
          }
      )
    
  }
}
