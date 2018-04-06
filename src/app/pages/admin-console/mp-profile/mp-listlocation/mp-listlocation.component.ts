import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MpLocationsService } from '../services/mp-locations.service';

@Component({
  selector: 'ahs-mp-listlocation',
  templateUrl: './mp-listlocation.component.html',
  styleUrls: ['./mp-listlocation.component.scss']
})
export class MpListlocationComponent implements OnInit {

  showblock: boolean =false;

  rows = [];
  temp = [];
  selected = [];
  result = [];
  columns = [
      { prop: 'id' },
      { name: 'location' },
      { name: 'address' },
      { name: 'city' },
      { name: 'state' }
  ];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private mpLocationsService: MpLocationsService) {
      this.showblock = false;
  }

  ngOnInit() {
      this.getMPLocations();
  }

  getMPLocations() {
      this.mpLocationsService.getMPLocations()
          .subscribe(
              resp =>{
                  console.log(resp);
                  let data2 = JSON.parse(JSON.stringify(resp));
                  this.rows =  data2;
              }
          )
  }

  onclickShow(event){
      event.preventDefault();
      this.showblock = true;
      console.log(this.showblock);
  }

}