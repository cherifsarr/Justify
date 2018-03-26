/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'az-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/

/* import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Feature } from '../../../shared/models/feature';
//import { SvcFeatureService } from '../../../shared/services/svc-feature.service';

@Component({
    selector: 'az-dynamic-tables',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './features.component.html',
    styleUrls: ['../../../theme/styles/table-styling.scss']
})
export class FeaturesComponent implements OnInit {
    ngOnInit() {
        //this.getFeatures();
        this.fetch((data) => {
            this.temp = [...data];
            this.rows = data;
        });

    }

    editing = {};
    rows = [];
    temp = [];
    selected = [];

    columns = [
        { name: 'id' },
        { name: 'name' },
        { name: 'description' },
        { name: 'type' },
        { name: 'scope' }
    ];
    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor() {
        this.fetch((data) => {
            this.temp = [...data];
            this.rows = data;
        });
    }
 
    //constructor(private svcFeature: SvcFeatureService) {
    //    this.fetch((data) => {
    //        this.temp = [...data];
    //        this.rows = data;
    //    });
    //}

    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', '../../../assets/data/features.json');

        req.onload = () => {
            cb(JSON.parse(req.response));
        };

        req.send();
        console.log(req.response);
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }

    getFeatures(): void {
        //this.aFeatures = this.svcFeature.getFeatures();
    }

}
*/

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Feature } from '../../../shared/models/feature';
import { FeaturesService } from '../../../shared/services/features.service';


@Component({
    /*selector: 'az-dynamic-tables',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './dynamic-tables.component.html'*/

    selector: 'az-dynamic-tables',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './features.component.html',
    styleUrls: ['../../../theme/styles/table-styling.scss', '../../../theme/styles/AhsStyles.css']

})
export class FeaturesComponent {

    editing = {};
    rows = [];
    temp = [];
    selected = [];

    columns = [
        { prop: 'id' },
        { name: 'code' },
        { name: 'name' },
        { name: 'description' },
        { name: 'type' },
        { name: 'orgLevel' },
        { name: 'labLevel' },
        { name: 'mpLevel' }
    ];

    @ViewChild(DatatableComponent) table: DatatableComponent;

    //constructor() {
    constructor(private oFeaturesService: FeaturesService) {
        //private oFeaturesService: FeaturesService
        oFeaturesService.getFeatures()
            .subscribe(

            (data) => {
                let data2 = JSON.parse(JSON.stringify(data));
                this.temp = [...data2];
                this.rows = data2;
                //console.log('Kamal');
                //console.log(data);
                //console.log(data2);
            });

        //this.fetch((data) => {
        //    this.temp = [...data];
        //    this.rows = data;
        //});
    }

    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/data/features.json`);

        req.onload = () => {
            cb(JSON.parse(req.response));
        };

        req.send();
    }

    updateValue(event, cell, rowIndex) {
        console.log('inline editing rowIndex', rowIndex)
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = [...this.rows];
        console.log('UPDATED!', this.rows[rowIndex][cell]);
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }

    onSelect({ selected }) {
        console.log('Select Event', selected, this.selected);
        this.selected.splice(0, this.selected.length);
        this.selected.push(...selected);
    }

    onActivate(event) {
        console.log('Activate Event', event);
    }
}
