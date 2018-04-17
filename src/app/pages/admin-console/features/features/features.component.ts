//import { Component, OnInit } from '@angular/core';
//
//@Component({
//  selector: 'ahs-features',
//  templateUrl: './features.component.html',
//  styleUrls: ['./features.component.scss']
//})
//export class FeaturesComponent implements OnInit {
//
//  constructor() { }
//
//  ngOnInit() {
//  }
//
//}


import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Feature } from '../feature';
import { FeaturesService } from '../features.service';


@Component({
    selector: 'ahs-features',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './features.component.html',
    styleUrls: ['../../../../theme/styles/table-styling.scss', '../../../../theme/styles/AhsStyles.css']

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

    constructor(private oFeaturesService: FeaturesService) {
       oFeaturesService.getFeatures()
            .subscribe(

            (data) => {
                let data2 = JSON.parse(JSON.stringify(data));
                this.temp = [...data2];
                this.rows = data2;
            });
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
