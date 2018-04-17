//import { Component, OnInit } from '@angular/core';
//
//@Component({
//  selector: 'ahs-listroles',
//  templateUrl: './listroles.component.html',
//  styleUrls: ['./listroles.component.scss']
//})
//export class ListrolesComponent implements OnInit {
//
//  constructor() { }
//
//  ngOnInit() {
//  }
//
//}




import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Role } from '../../roles/role';
import { RolesService } from '../../roles/roles.service';

@Component({
    selector: 'ahs-orgslistroles',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './Listroles.component.html',
    styleUrls: ['../../../../theme/styles/table-styling.scss', '../../../../theme/styles/AhsStyles.css']

})


export class ListrolesComponent {

    editing = {};
    rows = [];
    temp = [];
    selected = [];

    columns = [
        { prop: 'id' },
        { name: 'name' },
        { name: 'orgLevel' },
        { name: 'labLevel' },
        { name: 'mpLevel' },
        { name: 'enabled' }
    ];
    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(private oRolesService: RolesService) {
        oRolesService.getRoles()
            .subscribe(
            (data) => {
                let data2 = JSON.parse(JSON.stringify(data));
                this.temp = [...data2];
                this.rows = data2;
                //console.log('Kamal');
                //console.log(data);
                //console.log(data2);
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
