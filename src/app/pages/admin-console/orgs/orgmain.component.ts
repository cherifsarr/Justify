import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ahs-orgmain',
  templateUrl: './orgmain.component.html',
  styleUrls: ['./orgmain.component.scss']
})
export class OrgmainComponent implements OnInit, OnDestroy {
    private sub: any;
    public isListRole: boolean;
    public isEditRole: boolean;
    public isListUser: boolean;
    public isEditUser: boolean;
    redirectURL: string;


    constructor(_route: ActivatedRoute, _router: Router) {
        this.sub =_router.events.subscribe((val) => {
            this.isListRole = this.isListUser = true;
            this.isEditRole = this.isEditUser = false;

     //       console.log('Router event ==> ' + _router.url.indexOf('/editrole') + ' === ' + _router.url);

            if (_router.url.indexOf('/editrole/') > 0) {
                this.isListRole = false;
                this.isEditRole = true;
                this.redirectURL = _router.url;
            }
            if (_router.url.indexOf('/edituser') > 0) {
                this.isListUser = false;
                this.isEditUser = true;
                this.redirectURL = _router.url;
            }
        });
    }

    ngOnInit() {
        //console.log('Orgmain. Oid: ' + sessionStorage.getItem('OrgId'));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }}
