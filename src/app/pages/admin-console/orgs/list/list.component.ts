//import { Component, OnInit } from '@angular/core';
//
//@Component({
//  selector: 'ahs-list',
//  templateUrl: './list.component.html',
//  styleUrls: ['./list.component.scss']
//})
//export class ListComponent implements OnInit {
//
//  constructor() { }
//
//  ngOnInit() {
//  }
//
//}



import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Org } from '../org';
import { OrgService } from '../org.service';

@Component({
    selector: 'az-dynamic-tables',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './list.component.html',
    styleUrls: ['../../../../theme/styles/table-styling.scss', '../../../../theme/styles/AhsStyles.css']

})
export class ListComponent {

    editing = {};
    rows = [];
    temp = [];
    selected = [];

    columns = [
        { prop: 'id' },
        { name: 'name' },
        { name: 'displayName' },
        { name: 'website' }
    ];
    @ViewChild(DatatableComponent) table: DatatableComponent;

    //constructor() {
    constructor(private oOrgService: OrgService) {
        oOrgService.getOrgs()
            .subscribe(

            (data) => {
                let data2 = JSON.parse(JSON.stringify(data));
                this.temp = [...data2];
                this.rows = data2;
                console.log(data2);
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