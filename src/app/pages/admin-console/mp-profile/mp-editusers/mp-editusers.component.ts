import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MpUsersService } from '../services/mp-users.service';
import { MpLocationsService } from '../services/mp-locations.service';
import { AppRole } from '../../../../shared/models/appRole';
import { Mplocation } from '../../../../shared/models/mplocation';
import { Scope } from '../../../../shared/utils/scope.enum';
import { ActivatedRoute, Router } from '@angular/router';
import {User} from "../../../../shared/models/user";
import {Users} from "../user-list";

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
  private mpUser: User;
  private user=[];

  idUser: string;
  sub2: any;
  public users = Users;

  constructor(private router: ActivatedRoute, route: Router,formBuilder: FormBuilder, private mpuserService: MpUsersService, private locationService: MpLocationsService) {
    this.form = formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      role: ['', Validators.required],
      title: [''],
      isEnabled: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      locked: [''],
      sendActivationMail: [''],
      passwordChange: ['']
    });

      this.mpUser = new User();
   }

  ngOnInit() {

      /**
       * get parent id = id Pm Profile
       */
      let sub2 = this.router.parent.params.subscribe(parentParams => {
          this.idProfile =  parentParams.id;
          this.getRoles(Scope.MP);
          this.getLocations(this.idProfile);
      });

    this.sub2 = this.router.params.subscribe(params => {
        console.log(params);
      if (params.idUser) {
        this.idUser = params.idUser;
          this.user = this.users.filter(user => user.id === this.idUser);
          this.mpUser = this.user[0];
          this.form.get('username').setValue(this.mpUser.userName);
          this.form.get('firstname').setValue(this.mpUser.firstName);
          this.form.get('lastname').setValue(this.mpUser.lastName);
          this.form.get('role').setValue(this.mpUser.role);
          this.form.get('email').setValue(this.mpUser.email);
          this.form.get('password').setValue(this.mpUser.password);
          this.form.get('sendActivationMail').setValue(this.mpUser.sendActivationEmail);
          this.form.get('locked').setValue(this.mpUser.isLockedOut);
          this.form.get('isEnabled').setValue(this.mpUser.isEnabled);
          this.form.get('passwordChange').setValue(this.mpUser.forcePasswordChang);

       /* this.mpuserService.getMpUserById(this.idUser)
            .subscribe( resp => {
                //this.mpUser = resp;

                // this.form.get('username').setValue(this.mpUser.userName);
                // this.form.get('firstname').setValue(this.mpUser.firstName);
                // this.form.get('lastname').setValue(this.mpUser.lastName);
                // this.form.get('role').setValue(this.mpUser.role);
                // this.form.get('isEnabled').setValue(this.mpUser.isEnabled);

            })*/
      }
    })
  }

  /**
   * Get the roles by scope : MP = 1
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

      this.mpUser.userName = form.username;
      this.mpUser.firstName = form.firstname;
      this.mpUser.lastName = form.lastname;
      this.mpUser.email = form.email;
      this.mpUser.role = form.role;
      this.mpUser.title = form.title;
      this.mpUser.password = form.password;
      this.mpUser.isEnabled = !form.isEnabled? true:!form.isEnabled;
      this.mpUser.sendActivationEmail = form.sendActivationMail;
      this.mpUser.isLockedOut = form.locked;
      this.mpUser.scope = Scope.MP;
      this.mpUser.forcePasswordChang = form.passwordChange;
      this.mpUser.businessProfileId = this.idProfile;
      this.mpUser.title ='Mr';
      this.mpUser.confirmEmail=form.email;
      this.mpUser.confirmPassword=form.password;

      console.log('onSubmit');
      console.log(this.mpUser);
        this.mpuserService.saveMPUser(this.mpUser)
            .subscribe(resp =>{
                this.form.reset();
            });

  }

    /**
     *
     * @param e
     */
    public onPasswordGenerate(e) {
        e.preventDefault();
        this.form.get('password').setValue(randomPassword(12));
    }

}


/**
 *
 */
export function randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}
