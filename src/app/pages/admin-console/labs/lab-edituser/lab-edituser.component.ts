import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LabUsersService} from "../services/lab-users.service";
import {User} from "../../../../shared/models/user";
import {MPValidatorService} from "../../mp-profile/services/mp-validators.service";
import {RoleListItem} from "../../../../shared/models/rolelistitem";
import {Scope} from "../../../../shared/utils/scope.enum";

@Component({
  selector: 'ahs-lab-edituser',
  templateUrl: './lab-edituser.component.html',
  styleUrls: ['./lab-edituser.component.scss']
})
export class LabEdituserComponent implements OnInit {

    id: string;
    private sub: any;
    public router: ActivatedRoute;
    public form: FormGroup;
    public Roles: RoleListItem[];
    isUpdate: boolean;
    private user: User;

  constructor(router: ActivatedRoute, fb: FormBuilder, private userService: LabUsersService) {
      this.router = router;
      this.form = fb.group({

          username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
          //roleId: ['', Validators.required],
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
  }

  ngOnInit() {

      /**
       * get parent id = id lab profile
       */
      let sub2 = this.router.parent.params.subscribe(parentParams => {
          this.id =  parentParams.id;
      });

      this.sub = this.router.params.subscribe(params => {
          if (params['id']){
            this.setLabUser(params['id']);
          }
      });
  }

  setLabUser(id: string){
     this.userService.getUserLabById(id)
         .subscribe(resp =>{
          this.form.get('username').setValue(this.user.userName);
          this.form.get('firstname').setValue(this.user.firstName);
          this.form.get('lastname').setValue(this.user.lastName);
          this.form.get('email').setValue(this.user.email);
          this.form.get('password').setValue(this.user.password);
          this.form.get('role').setValue(this.user.roleId);

         })
  }

    public onSubmit(form): void {
            let lastaccess = new Date();
            this.user.userName = form.username;
            this.user.firstName = form.firstname;
            this.user.lastName = form.lastname;
            this.user.email = form.email;
            this.user.password = form.password;
            this.user.role = form.role;
            this.user.scope = Scope.Lab;
            this.user.isLockedOut = form.locked;
            this.user.sendActivationEmail = form.sendActivationMail;
            this.user.forcePasswordChange = form.passwordChange;
            this.user.businessProfileId = this.id;
            this.user.title = 'Mr';
            this.user.lastAccess = lastaccess;
            this.user.confirmEmail = form.email;
            this.user.confirmPassword = form.passwordChange;
            this.user.isEnabled = form.isEnabled;
            console.log(this.user);
            this.userService.saveLabUser(this.user)
                .subscribe(resp =>{
                   // this.form.reset();
                })

    }

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
