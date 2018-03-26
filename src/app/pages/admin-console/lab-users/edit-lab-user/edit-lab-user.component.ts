import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { User } from "../../../../shared/models/user";
import { RoleListItem } from "../../../../shared/models/rolelistitem";
import { LabUserService } from "../lab-user.service";

@Component({
  selector: 'ahs-edit-lab-user',
  templateUrl: './edit-lab-user.component.html',
  styleUrls: ['./edit-lab-user.component.scss']
})


export class EditLabUserComponent {
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


    constructor(router: Router, fb: FormBuilder, private userService: LabUserService) {
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
            confirmPassword: ['', Validators.required]
        }, { validator: matchingPasswords('password', 'confirmPassword') });

        this.userService.getRoles(2).subscribe(
            (val) => {
                //  let result: AuthResult = JSON.parse(val.toString());
                this.Roles = val;
            },
            response => {
            },
            () => {
            });;

        this.user = new User();

    }

    public onSubmit(values: Object): void {
        if (this.form.valid) {
         //   alert(this.form.get('username').value);
            this.user.userName = this.form.get('username').value; // this.form.controls['username'].value;
            this.user.firstName = this.form.get('firstname').value;
            this.user.lastName = this.form.get('lastname').value;

            this.user.email = this.form.get('email').value;
            this.user.password = this.form.get('password').value;
            this.user.passwordConfirmation = this.form.get('confirmPassword').value;
            this.user.title = this.form.get('title').value;
            this.user.role = this.form.get('role').value;
            this.user.scope = 2;

            this.userService.createUser(this.user);

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
