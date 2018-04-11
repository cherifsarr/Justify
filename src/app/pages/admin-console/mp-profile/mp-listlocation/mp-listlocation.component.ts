import {Component, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MpLocationsService } from '../services/mp-locations.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ahs-mp-listlocation',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mp-listlocation.component.html',
  styleUrls: ['./mp-listlocation.component.scss',  '../../../../theme/styles/table-styling.scss', '../../../../theme/styles/AhsStyles.css']
})
export class MpListlocationComponent implements OnInit {

  id: string;
  private sub: any;
  public router: ActivatedRoute;

  showblock: boolean =false;

  idLocation: string;
  rows = [];
  temp = [];
  selected = [];
  result = [];
  columns = [
      { prop: 'id' },
      { name: 'name' },
      { name: 'address1' },
      { name: 'city' },
      { name: 'state' }
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(router: ActivatedRoute, private mpLocationsService: MpLocationsService) {
      this.showblock = false;

      this.router = router;
  }

  ngOnInit() {
          this.sub = this.router.parent.params.subscribe(params => {
              this.id = params['id'];
              this.getMPLocationsByIdProfil(this.id);
      });
  }

    /**
     * Get Mp Location by id Profile
     * @param id
     */
    getMPLocationsByIdProfil(id) {
      this.mpLocationsService.getMPLocationsByIdProfil(id)
          .subscribe(
              resp =>{
                  let data2 = JSON.parse(JSON.stringify(resp));
                  this.rows =  data2;
                  this.listMPLocations(this.rows);
              }
          )
  }

    /**
     * 
     * @param listMPLocations
     */
    listMPLocations(listMPLocations){
        this.rows = listMPLocations;
    }

    /**
     *
     * @param event
     * @param id
     */
  onclickShow(event, id){
      event.preventDefault();
      this.showblock = true;
      this.idLocation = id;
  }

}
