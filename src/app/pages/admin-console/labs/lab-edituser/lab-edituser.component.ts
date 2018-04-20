import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LabUsersService} from "../services/lab-users.service";
import {User} from "../../../../shared/models/user";
import {MPValidatorService} from "../../mp-profile/services/mp-validators.service";
import {RoleListItem} from "../../../../shared/models/rolelistitem";
import {Scope} from "../../../../shared/utils/scope.enum";
import {AppUser} from "../../../../shared/models/appUser";
import {AppRole} from "../../../../shared/models/appRole";
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

@Component({
  selector: 'ahs-lab-edituser',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './lab-edituser.component.html',
  styleUrls: ['./lab-edituser.component.scss',
      '../../../../theme/styles/table-styling.scss',
      '../../../../theme/styles/AhsStyles.css'
    ]
})
export class LabEdituserComponent implements OnInit {

    id: string;
    private sub: any;
    public router: ActivatedRoute;
    public form: FormGroup;
    public Roles: RoleListItem[];
    isUpdate: boolean;
    loading: boolean;
    private user: User;
    isDisabled: boolean;

  constructor(router: ActivatedRoute, fb: FormBuilder, private userService: LabUsersService) {
      this.router = router;
      this.isDisabled = false;
      this.form = fb.group({
          username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
          role: ['', Validators.required],
          firstname: ['', Validators.required],
          lastname: ['', Validators.required],
          email: ['', Validators.compose([Validators.required, MPValidatorService.emailValidator])],
          password: ['', Validators.required],
          locked: [''],
          isEnabled:[''],
          sendActivationMail: [''],
          passwordChange: ['']
      }),

      this.userService.getRoles(Scope.Lab).subscribe(
          (val) => {
              this.Roles = val;
          },
          response => {
          },
          () => {
          });

      this.user = new User();
      //this.user.role = new AppRole();
  }

  ngOnInit() {

      this.loading = true;
      /**
       * get parent id = id lab profile
       */
      let sub2 = this.router.parent.params.subscribe(parentParams => {
          this.id =  parentParams.id;
      });

      this.sub = this.router.params.subscribe(params => {
          if (params['idLabUser']){
              this.isUpdate = true;
            this.setLabUser(params['idLabUser']);
          }else{
              this.isUpdate = false;
          }
      });
  }

  /**
   * Set Lab User
   * @param id - LabUserId
   */
  setLabUser(id: string){
     this.userService.getUserLabById(id)
         .subscribe((user: User) =>{
          this.form.get('username').setValue(user.userName);
          this.form.get('firstname').setValue(user.firstName);
          this.form.get('lastname').setValue(user.lastName);
          this.form.get('email').setValue(user.email);
          this.form.get('password').setValue(user.password);
          this.form.get('role').setValue(user.roleId);
          this.form.get('sendActivationMail').setValue(user.sendActivationEmail);
          this.form.get('isEnabled').setValue(user.isEnabled);
          this.form.get('passwordChange').setValue(user.forcePasswordChange);
          this.form.get('locked').setValue(user.isLockedOut);
          this.isDisabled = true;
          this.user = user;
             //console.log('userupdate ' + this.user);
         })
  }

  /**
   * Create lab user
   * @param form
   */
   onSubmit(form): void {
        this.loading = true;
        let identity = new AppUser();
        let lastaccess = new Date();

        //this.form.get('username').setValue(this.user.userName);
        this.user.userName = form.username;
        this.user.firstName = form.firstname;
        this.user.lastName = form.lastname;
        this.user.email = form.email;
        this.user.password = form.password;
        this.user.role = form.role;
        this.user.roleId = form.role;
        this.user.identityId =identity.id? identity.id:'';
        this.user.scope = Scope.Lab;
        this.user.isLockedOut = form.locked;
        this.user.sendActivationEmail = form.sendActivationMail;
        this.user.forcePasswordChange = form.passwordChange;
        this.user.businessProfileId = this.id;
        this.user.title = 'Mr';
        this.user.lastAccess = lastaccess;
        this.user.confirmEmail = form.email;
        this.user.confirmPassword = form.passwordChange;
        this.user.isEnabled = form.isEnabled? form.isEnabled :false;
        this.user.locationId = '';
        if(!this.isUpdate){
            this.userService.saveLabUser(this.user)
                .subscribe(resp =>{
                    // this.form.reset();
                    this.loading = false;
                }, () => {this.loading = false}, () => {this.loading = false})
        }else{
            this.userService.updateLabUser(this.user)
                .subscribe(resp =>{
                    this.loading = false;
                }, () => {this.loading = false}, () => {this.loading = false})
        }
  }


  /**
   * set password generated
   * @param e
   */
  public onPasswordGenerate(e) {
    e.preventDefault();
    this.form.get('password').setValue(randomPassword(12));
  }
}

/**
 *
 * @param length
 * @returns {string}
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

/**
 *
 * @param {string} passwordKey
 * @param {string} passwordConfirmationKey
 * @returns {(group: FormGroup) => void}
 */
export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        let password = group.controls[passwordKey];
        let passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({ mismatchedPasswords: true })
        }
    }
}
