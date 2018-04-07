import {Component, OnInit, Output, ViewChild} from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { MpLocationsService } from '../services/mp-locations.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'ahs-mp-listlocation',
  templateUrl: './mp-listlocation.component.html',
  styleUrls: ['./mp-listlocation.component.scss']
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

          this.sub = this.router.params.subscribe(params => {
              this.id = params['id'];
              this.getMPLocationsByIdProfil(this.id);
      });
  }

    /**
     *
     * @param id
     */
    getMPLocationsByIdProfil(id) {
      this.mpLocationsService.getMPLocationsByIdProfil(id)
          .subscribe(
              resp =>{
                  console.log(resp);
                  let data2 = JSON.parse(JSON.stringify(resp));
                  console.log(data2);
                  this.rows =  data2;
                  console.log(this.rows);
              }
          )
  }

  onclickShow(event, id){
      event.preventDefault();
      this.showblock = true;
      this.idLocation = id;
  }

}
