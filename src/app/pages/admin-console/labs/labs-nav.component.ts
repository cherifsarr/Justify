import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ahs-labs-nav',
  templateUrl: './labs-nav.component.html',
  styleUrls: ['./labs-nav.component.scss']
})
export class LabsNavComponent implements OnInit {

  sub: any;
  isEditLabProfile: boolean;
  isListLabProfile:boolean;
  constructor(private _route: ActivatedRoute, private _router: Router) {
    this.isEditLabProfile = false;
    this.isListLabProfile = false;
   }

  ngOnInit() {
    
    this.sub = this._router.events.subscribe(val => {
      if (this._router.url.indexOf('/listlabprofiles') > 0) {
          this.isEditLabProfile = false;
      }
      if (this._router.url.indexOf('/editlabprofile') > 0) {
          this.isEditLabProfile = true;
      }
    })
  }

  /**
   * redirect to Liste Lab Profiles
   */
  onGoToList() {
    this._router.navigate(['./listlabprofiles'], {relativeTo: this._route});
  }

}
