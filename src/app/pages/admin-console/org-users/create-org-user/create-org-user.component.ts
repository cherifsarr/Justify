import { Component, VERSION,  ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { User } from "../../../../shared/models/user";
import { RoleListItem } from "../../../../shared/models/rolelistitem";
import { OrgUserService } from "../org-user.service";

import { ToastrService, GlobalConfig } from 'ngx-toastr';

@Component({
    selector: 'ahs-create-org-user',
  templateUrl: './create-org-user.component.html',
  styleUrls: ['./create-org-user.component.scss']
})
export class CreateOrgUserComponent  {
    public router: Router;
    public form: FormGroup;
    public username: AbstractControl;
    public role: AbstractControl;
    public title: AbstractControl;
    public firstname: AbstractControl;
    public lastname: AbstractControl;
    public email: AbstractControl;
    //public confirmEmail: AbstractControl;
    public password: AbstractControl;
    public confirmPassword: AbstractControl;


    public randomPassword: AbstractControl;
    public isLockedOut: AbstractControl;
    public sendActivationEmail: AbstractControl;
    public forcePasswordChange: AbstractControl;
    public isEnabled: AbstractControl;
    private user: User;

    public Roles: RoleListItem[];

    options: GlobalConfig;

    constructor(router: Router, fb: FormBuilder, private userService: OrgUserService, public toastrService: ToastrService) {
        this.options = this.toastrService.toastrConfig;
        this.router = router;
        this.form = fb.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
            role: ['', Validators.required],
            title: '',
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, emailValidator])],
         //   confirmEmail: ['', Validators.compose([Validators.required, emailValidator])],
            password: ['', Validators.required],
         //   confirmPassword: ['', Validators.required]
        },/* { validator: matchingPasswords('password', 'confirmPassword') } */);

        this.userService.getRoles(4).subscribe(
            (val) => {
                //  let result: AuthResult = JSON.parse(val.toString());
                this.Roles = val;
            },
            response => {
            },
            () => {
            });

        this.user = new User();
     /*   this.username = this.form.controls['username'];
        this.firstname = this.form.controls['firstname'];
        this.lastname = this.form.controls['lastname'];
        this.email = this.form.controls['email'];
        this.password = this.form.controls['password'];
        this.confirmPassword = this.form.controls['confirmPassword'];
        this.role = this.form.controls['role'];
        this.title = this.form['title']; */
     //   this.randomPassword = this.form.controls['randomPassword'];
     //   this.isLockedOut = this.form.controls['isLockedOut'];
     //   this.sendActivationEmail = this.form.controls['sendActivationEmail'];
     //   this.forcePasswordChange = this.form.controls['forcePasswordChange'];
      //  this.isEnabled = this.form.controls['isEnabled'];

     /*   this.user.password = this.password.value;
        this.user.passwordConfirmation = this.confirmPassword.value;
        this.user.title = this.title.value;
        this.user.role = this.role.value;
        this.user.email = this.email.value;
        this.user.forcePasswordChange = this.forcePasswordChange.value;
        this.user.isEnabled = this.isEnabled.value;
        this.user.randomPassword = this.randomPassword.value;
        this.user.sendActivationEmail = this.sendActivationEmail.value;
        this.user.isLockedOut = this.isLockedOut.value; */

    }

    public onSubmit(values: Object): void {
        if (this.form.valid) {
        //    alert(this.form.get('username').value);
            this.user.userName = this.form.get('username').value; // this.form.controls['username'].value;
            this.user.firstName = this.form.get('firstname').value; 
            this.user.lastName = this.form.get('lastname').value; 

            this.user.email = this.form.get('email').value;  
            this.user.password = this.form.get('password').value;   
        //    this.user.passwordConfirmation = this.form.get('confirmPassword').value; 
        //    this.user.title = this.form.get('title').value; 
            this.user.role = this.form.get('role').value; 
            this.user.scope = 4;
          //  this.user.forcePasswordChange = this.forcePasswordChange.value;
           // this.user.isEnabled = this.isEnabled.value;
          //  this.user.randomPassword = this.randomPassword.value;
          //  this.user.sendActivationEmail = this.sendActivationEmail.value;
          //  this.user.isLockedOut = this.isLockedOut.value;

          //  alert(this.user.userName);
            this.userService.createUser(this.user).subscribe(
                (val) => {
                    //  let result: AuthResult = JSON.parse(val.toString());
                    this.toastrService.success("User created.");
                    this.form.reset();
                    return true;
                },
                response => {
                      console.log("POST call in error", response);
                    this.toastrService.error("Failed to create user.");
                },
                () => {
                    console.log("The POST observable is now completed.");
                    //Remove when return status is fixed;
                    this.toastrService.success("User created.");
                    this.form.reset();

                });


         //   console.log(values);
          //  this.router.navigate(['/login']);
        }
    }


}

export function emailValidator(control: FormControl): { [key: string]: any } {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        let password = group.controls[passwordKey];
        let passwordConfirmation = group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({ mismatchedPasswords: true })
        }
    }
}