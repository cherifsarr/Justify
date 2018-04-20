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
import { MPValidatorService } from '../services/mp-validators.service';
import { MpUser } from '../../../../shared/models/mpuser';
import { Identity } from '../../../../shared/models/identity';
import { AppUser } from '../../../../shared/models/appUser';
import { MPProfile } from '../../../../shared/models/mpprofile';
import { DatePipe } from '@angular/common';
import { MPProfileService } from '../services/mp-profile.service';
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
  isAnUpdate: boolean = false;
  idUser: string;
  sub2: any;
  mpUserUpdate: User;
  private role:AppRole;
  private mpProfile: MPProfile;
  private location: Mplocation;
  isDisabled: boolean;

  constructor(private router: ActivatedRoute, route: Router,
    formBuilder: FormBuilder, 
    private mpuserService: MpUsersService, 
    private mpprofileService: MPProfileService,
    private locationService: MpLocationsService) {
    this.form = formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      role: ['', Validators.required],
      location: ['', Validators.required],
      title: [''],
      isEnabled: [''],
      email: ['', Validators.compose([Validators.required, MPValidatorService.emailValidator])],
      password: ['', Validators.required],
      locked: [''],
      sendActivationMail: [''],
      passwordChange: ['']
    });

      this.isDisabled = false;
      this.mpUser = new User();
      this.mpUserUpdate = new User();
      this.mpUserUpdate.role = new AppRole();
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
      if (params.idUser) {
        this.isAnUpdate = true;
         this.idUser = params.idUser;
         console.log(this.idUser);
         this.setMpUser();
      }
      else {
        this.isAnUpdate = false;
      }
    })
  }
  /**
   * Set Mp User in Edit Page 
   */
  setMpUser() {
    this.mpuserService.getMpUserById(this.idUser)
    .subscribe( (resp: User) => {
        this.mpUser = resp;
    },()=>{}, () => {
        this.form.get('role').setValue(this.mpUser.roleId);
        this.form.get('username').setValue(this.mpUser.userName);
        this.form.get('firstname').setValue(this.mpUser.firstName);
        this.form.get('lastname').setValue(this.mpUser.lastName);
        this.form.get('location').setValue(this.mpUser.locationId);
        this.form.get('isEnabled').setValue(this.mpUser.isEnabled);
        this.form.get('email').setValue(this.mpUser.email);
        this.form.get('password').setValue(this.mpUser.password);
        this.form.get('sendActivationMail').setValue(this.mpUser.sendActivationEmail);
        this.form.get('locked').setValue(this.mpUser.isLockedOut);
        this.form.get('passwordChange').setValue(this.mpUser.forcePasswordChange);
        this.isDisabled = true;
    })
  }
  /**
   * Get the roles by scope : MP = 1
   */
  getRoles(scope) {
    this.mpuserService.getRoles(scope)
         .subscribe(resp => {
           this.roles = resp;
         })
  }

  /**
   * Get Profile by id
   * @param id - mpProfileId
   */
  getMPProfile(id: string) {
    this.mpprofileService.getMPProfileById(id)
    .subscribe((profile: MPProfile) => {
      this.mpUserUpdate.businessProfileId = profile.id;
      //this.mpUserUpdate.mpProfileId = profile.id;
      this.mpProfile = profile;
    })
  }
  /**
   * get Location by id
   * @param id - locationId
   */
  getLocation(id: string) {
    this.locationService.getMPLocationById(id)
    .subscribe((location: Mplocation) => {
      this.mpUserUpdate.locationId = location.id;
      //this.mpUserUpdate.mpLocationId = location.id;
      this.location = location;
    })
  }
  
  /**
   *Get the Locations List by id profile
   */
  getLocations(idprofile) {
    this.locationService.getMPLocationsByIdProfil(idprofile)
    .subscribe(resp => {
       this.locations = resp;
    })
  }

  /**
   * Submitted form for create and update
   * @param form 
   */
  onSubmit(form) {
      let lastaccess = new Date();
      if(!this.isAnUpdate) {
        this.mpUser.userName = form.username;
        this.mpUser.firstName = form.firstname;
        this.mpUser.lastName = form.lastname;
        this.mpUser.email = form.email;
        this.mpUser.roleId = form.role;
        this.mpUser.locationId = form.location;
        this.mpUser.title = form.title;
        this.mpUser.password = form.password;
        this.mpUser.isEnabled = !form.isEnabled ? true : !form.isEnabled;
        this.mpUser.sendActivationEmail = form.sendActivationMail;
        this.mpUser.isLockedOut = form.locked;
        this.mpUser.scope = Scope.MP;
        this.mpUser.forcePasswordChange = form.passwordChange;
        this.mpUser.businessProfileId = this.idProfile;
        this.mpUser.title = 'Mr';
        this.mpUser.lastAccess = lastaccess;
        this.mpUser.confirmEmail = form.email;
        this.mpUser.confirmPassword = form.passwordChange;
        this.mpuserService.saveMPUser(this.mpUser)
        .subscribe(resp =>{
            this.form.reset();
        });
      }
       else {
        this.getMPProfile(this.idProfile);
        this.getLocation(form.location);
        let identity = new AppUser();
        this.mpUserUpdate.role = form.role;
        this.mpUserUpdate.roleId = form.role;
        this.mpUserUpdate.id = this.idUser;
        this.mpUserUpdate.identityId = identity.id;
        this.mpUserUpdate.userName = form.username;
        this.mpUserUpdate.firstName = form.firstname;
        this.mpUserUpdate.lastName = form.lastname;
        this.mpUserUpdate.email = form.email;
        this.mpUserUpdate.identityId = identity.id;
        this.mpUserUpdate.isLockedOut = form.locked;
        this.mpUserUpdate.scope = Scope.MP;
        this.mpUserUpdate.sendActivationEmail = form.sendActivationMail;
        this.mpUserUpdate.forcePasswordChange = form.passwordChange;
        //this.mpUserUpdate.identity.passwordHash = form.password;
        this.mpUserUpdate.isEnabled = form.isEnabled;
        this.mpUserUpdate.title = '';
        console.log(this.mpUserUpdate);
         this.mpuserService.updateMPUser(this.mpUserUpdate)
         .subscribe(resp => {})
       }

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
 * Create random password
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
