import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MpUsersService } from '../services/mp-users.service';
import { MpLocationsService } from '../services/mp-locations.service';
import { AppRole } from '../../../../shared/models/appRole';
import { Mplocation } from '../../../../shared/models/mplocation';
import { Scope } from '../../../../shared/utils/scope.enum';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ahs-mp-editusers',
  templateUrl: './mp-editusers.component.html',
  styleUrls: ['./mp-editusers.component.scss']
})
export class MpEditusersComponent implements OnInit {

  idProfile: string;
  sub: any;
  public form: FormGroup;
  roles: AppRole[];
  locations:Mplocation[];

  constructor(private router: ActivatedRoute, route: Router,formBuilder: FormBuilder, private mpuserService: MpUsersService, private locationService: MpLocationsService) {
    this.form = formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      role: ['', Validators.required],
      title: ['', Validators.required],
      isEnabled: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      locked: ['', Validators.required],
      sendActivationMail: ['', Validators.required],
      passwordChange: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.sub = this.router.parent.params.subscribe(params => {
      if (params.id) {
        console.log(params);
        this.idProfile = params.id;
        this.getRoles(Scope.MP);
        this.getLocations(this.idProfile);
      }
    })
  }

    /**
   * Get the roles by id profile
   */
  getRoles(scope) {
    this.mpuserService.getRoles(scope)
         .subscribe(resp => {
           this.roles = resp;
           console.log(this.roles);
         })
  }

  /**
   *Get the Locations List by id profile
   */
  getLocations(idprofile) {
    this.locationService.getMPLocationsByIdProfil(idprofile)
    .subscribe(resp => {
       this.locations = resp;
       console.log(this.locations);
    })
  }

  onSubmit(form) {

  }
  onPasswordGenerate (e) {

  }
}
