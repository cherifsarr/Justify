/*import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'ahs-viewrole',
  templateUrl: './viewrole.component.html',
  styleUrls: ['./viewrole.component.scss']
})
export class ViewroleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/


import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'az-viewrole',
    templateUrl: './viewrole.component.html',
    styleUrls: ['./viewrole.component.scss']
})

export class ViewroleComponent implements OnInit, OnDestroy {
    id: string;
    private sub: any;


    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
