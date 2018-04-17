import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, AbstractControl, FormBuilder, Validators, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { ToastrService, GlobalConfig, IndividualConfig, TOAST_CONFIG } from 'ngx-toastr';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

import { RoleListItem } from "../../../../shared/models/rolelistitem";
import { User } from "../../../../shared/models/user";
import { OrgUserService } from '../../org-users/org-user.service';
import { CommonService } from '../../../../shared/utils/common.service';

import { UserService } from '../user.service';
import { existingUsernameValidator } from '../../../../shared/services/validation.service';

@Component({
    selector: 'ahs-orgsedituser',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './edituser.component.html',
    styleUrls: [
        '../../../../theme/styles/table-styling.scss',
        '../../../../theme/styles/AhsStyles.css'
    ],
})


export class EdituserComponent implements OnInit, OnDestroy {
    id: string;
    private sub: any;

    sFormFields: string = 'username,firstname,lastname,roleId,email,password,cbEnabled,cbLocked,cbSendActEmail,cbChgPswd,LastAccess';

    svcORGUSER: OrgUserService;
    svcCMN: CommonService;
    form: FormGroup;

    router: Router;
    activatedRoute: ActivatedRoute;

    businessProfileId: AbstractControl;
    username: AbstractControl;
    roleId: AbstractControl;
    firstname: AbstractControl;
    lastname: AbstractControl;
    email: AbstractControl;
    password: AbstractControl;

    randomPassword: AbstractControl;
    cbLocked: AbstractControl;
    cbSendActEmail: AbstractControl;
    cbChgPswd: AbstractControl;
    cbEnabled: AbstractControl;
    lastAccess: Observable<string>;
    user: User;
    Roles: RoleListItem[];
    options: GlobalConfig;
    loading: boolean;
    userService: UserService;



    constructor(_oCS: CommonService, _routerIn: Router, _route: ActivatedRoute, fb: FormBuilder, _userService: UserService,
        _oOUS: OrgUserService, public toastrService: ToastrService) {
        this.userService = _userService;
        this.router = _routerIn;
        this.activatedRoute = _route;
        this.svcORGUSER = _oOUS;
        this.svcCMN = _oCS;
        this.options = this.toastrService.toastrConfig;
        this.options.positionClass = 'toast-bottom-full-width';

        this.form = fb.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(6)]), [existingUsernameValidator(this.userService) ]],
            roleId: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.compose([Validators.required, emailValidator])],
            password: ['', Validators.required],
            businessProfileId: '',
            cbEnabled: false,
            cbLocked: false,
            cbSendActEmail: false,
            cbChgPswd: false,
        });


        this.svcORGUSER.getRoles(4).subscribe(
            (val) => {
                //  let result: AuthResult = JSON.parse(val.toString());
                this.Roles = val;
            },
            response => {
            },
            () => {
            });

        this.user = new User();
    }






    ngOnInit() {
        this.loading = true;
        this.sub = this.activatedRoute.params.subscribe(params => {
            this.id = params['id'];
        });
        //console.log('EditUser. User-id: ' + this.id); // xxxx remove it later
        //console.log('EditUser. OrgId: ' + sessionStorage.getItem('OrgId'));
        if (this.id == '') {
            this.businessProfileId = this.svcCMN.GetString(sessionStorage.getItem('OrgId'));
            //console.log('businessProfileId: ' + this.businessProfileId);
            this.form.get('businessProfileId').setValue(this.businessProfileId);
        }
        else {
            this.svcORGUSER.getOrgUser(this.id).subscribe(
                (data) => {
                //this.form.at(0).controls.password.clearValidators();
                //this.form.controls.forEach(c => { console.log(c.name) });
                //this.form.controls.forEach(c => (c.name=='password').clearValidators());
                //this.items.at(0).controls.name.clearValidators()
                //this.form.controls['password'].clearValidators();
                //this.form.controls['password'].updateValueAndValidity();

                this.businessProfileId = this.svcCMN.GetString(data.businessProfileId);
                this.username = this.svcCMN.GetString(data.userName);
                this.roleId = this.svcCMN.GetString(data.roleId);
                this.firstname = this.svcCMN.GetString(data.firstName);
                this.lastname = this.svcCMN.GetString(data.lastName);
                this.email = this.svcCMN.GetString(data.email);
                this.cbEnabled = this.svcCMN.GetString(data.isEnabled);
                this.cbLocked = this.svcCMN.GetString(data.isLockedOut);
                //console.log('Last access:' + data.lastAccess);
                this.lastAccess = this.svcCMN.GetString(data.lastAccess);
                //console.log('this.access:' + this.lastAccess);
                this.cbChgPswd = this.svcCMN.GetString(data.forcePasswordChange);
                this.cbSendActEmail = this.svcCMN.GetString(data.sendActivationEmail);


                this.form.get('username').setValue(this.username);
                //this.username.clearValidators();    // not needed for existing users
                this.form.get('username').disable();

                this.form.get('roleId').setValue(this.roleId);
                this.form.get('firstname').setValue(this.firstname);
                this.form.get('lastname').setValue(this.lastname);
                this.form.get('email').setValue(this.email);
                this.form.get('businessProfileId').setValue(this.businessProfileId);

                this.form.get('cbEnabled').setValue(!this.cbEnabled);
                this.form.get('cbLocked').setValue(this.cbLocked);
                this.form.get('cbSendActEmail').setValue(this.cbSendActEmail);
                this.form.get('cbChgPswd').setValue(this.cbChgPswd);

                // no need to show password
                this.form.get('password').clearValidators();
                this.form.get('password').updateValueAndValidity();

                //if (this.password != null) {
                //    this.password.clearValidators();    // not mandatory for updates
                //    this.password.clearAsyncValidators();
                //    this.password.updateValueAndValidity();
                //}
                //else {
                //    console.log('password field handler is null');
                //}


                //console.log('User data for id: ' + this.id);
                //console.log(data);
                this.loading = false;
                },
                response => {
                    this.toastrService.error("Failed to get user data.", '', this.options);
                    this.loading = false;
                },
                () => {
                    this.loading = false;
                }
            );
        }
        this.loading = false;
    }

    public onSubmit(values: Object): void {
        //alert('\tForm Submit\nForm is Valid: ' + this.form.valid);
        if (this.form.valid) {
            this.loading = true;

            //alert(this.form.get('username').value);
            this.user.id = this.id;
            //this.user.businessProfileId = this.form.get('businessProfileId').value;
            // xxxx uncomment above line and delete following one 
            this.user.businessProfileId = '680B4638-E23C-4BD6-72CD-08D58E2D9E43'
            this.user.userName = this.form.get('username').value;
            this.user.roleId = this.form.get('roleId').value;
            this.user.firstName = this.form.get('firstname').value;
            this.user.lastName = this.form.get('lastname').value;

            this.user.email = this.form.get('email').value;
            if (!this.svcCMN.IsNEB(this.form.get('password').value))
                this.user.password = this.form.get('password').value;
            this.user.isEnabled = !this.form.get('cbEnabled').value;
            this.user.isLockedOut = this.form.get('cbLocked').value;
            //this.cbSendActEmail = this.form.get('cbSendActEmail').value;
            //this.cbChgPswd = this.form.get('cbChgPswd').value;
            this.user.sendActivationEmail = this.form.get('cbSendActEmail').value;
            this.user.forcePasswordChange = this.form.get('cbChgPswd').value;

            this.user.scope = 4;    // 4 - Org user, 2 - Lab user, 1 - MP user

            if (this.id == '') {
                this.svcORGUSER.createUser(this.user).subscribe(
                    (val) => {
                        //console.log('New user created'); console.log(val);
                        this.toastrService.success("New user created.", '', this.options);
                        this.form.reset();
                        this.loading = false;
                    },
                    (response: HttpErrorResponse )=> {
                        //console.log(response.error);
                        this.toastrService.error("Failed to create user.", '', this.options);
                        this.loading = false;
                    },
                    () => {
                        this.loading = false;
                    }
                );
            }
            else {
                // xxxx add code here to save user
                //console.log(this.id);   // xxxx
                //console.log(JSON.stringify(this.user)); // xxxx
                this.svcORGUSER.saveUser(this.id,this.user).subscribe(
                    (val) => {
                        //console.log('User details saved.');
                        //console.log(val);
                        this.toastrService.success("User details updated.", '', this.options);
                        this.loading = false;
                    },
                    (response: HttpErrorResponse) => {
                        //console.log(response.error);
                        this.toastrService.error("Failed to update user.", '', this.options);
                        this.loading = false;
                    },
                    () => {
                        this.loading = false;
                    });
            }
        }
        else {
            console.log('form validation failed.');
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
    public cancelme(e) {
        this.router.navigate(['../listusers']);
        e.preventDefault();
    }
    public onPasswordGenerate(e) {
        e.preventDefault();
        this.form.get('password').setValue(randomPassword(12));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an ErrorObservable with a user-facing error message
        return new ErrorObservable(
            'Something bad happened; please try again later.');
    };
}

export function randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
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

