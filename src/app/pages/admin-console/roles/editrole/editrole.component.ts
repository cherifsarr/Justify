/// <reference path="../../../../shared/services/editrole.service.ts" />
/*import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'ahs-editrole',
  templateUrl: './editrole.component.html',
  styleUrls: ['./editrole.component.scss']
})
export class EditroleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/



import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ActivatedRoute } from '@angular/router';
import { EditroleService } from '../../../../shared/services/editrole.service';


@Component({
    /*selector: 'az-editrole',
    templateUrl: './editrole.component.html',
    styleUrls: ['./editrole.component.scss']*/


    selector: 'az-dynamic-tables',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './editrole.component.html',
    styleUrls: ['../../../../theme/styles/table-styling.scss']
})


export class EditroleComponent implements OnInit, OnDestroy {
    id: string;
    private sub: any;
    roleName: string;
    orgLevel: boolean;
    labLevel: boolean;
    mpLevel: boolean;
    enabled: boolean;

    editing = {};
    rows = [];
    temp = [];
    selected = [];

    columns = [
        { prop: 'id' },
        { name: 'name' },
        { name: 'scopeview' },
        { name: 'scopecreate' },
        { name: 'scopeedit' },
        { name: 'scopedelete' }
    ];
    @ViewChild(DatatableComponent) table: DatatableComponent;



    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
            this.roleName = params['name'];
            this.orgLevel = params['o'];
            this.labLevel = params['l'];
            this.mpLevel = params['mp'];
            this.enabled = params['e'];
        });


        //http://devapi.justify.amhealthsys.com/api/AppRoles/ba83473e-5a30-4c1b-b610-64adfe2aa628

        this.fetch((data) => {
            console.log(data);
            /*this.roleName = data.name;
            this.scopeAhs = data.scopeAhs;
            this.scopeLab = data.scopeLab;
            this.scopeMP = data.scopeMP;
            this.disabled = data.disabled;*/


            //this.temp = [...data];
            //this.rows = data;
        });

    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }


    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', 'assets/data/roledetails.json');

        req.onload = () => {
            cb(req.response);
            //cb(JSON.parse(req.response));
        };

        req.send();
    }
}


