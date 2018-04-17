import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { AuthService } from '../../shared/services/auth.service';
import { UserConfig } from '../../shared/models/userConfig';


@Component({
  selector: 'az-login',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {  
  //  public router: Router;
    public form:FormGroup;
    public username:AbstractControl;
    public password: AbstractControl;
    public errorMessage$: Observable<string>;
    loading: boolean;

    constructor(private router: Router, fb: FormBuilder, private userService: UserService, private authService: AuthService) {
     //   this.router = router;
        this.form = fb.group({
            'username': ['', Validators.compose([Validators.required])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });

        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];
    }

    ngOnInit() {
        sessionStorage.removeItem('auth_token');
    }

    //public onSubmit(values:Object):void {
    //    if (this.form.valid) {
    //    //    console.log(values);
    //        this.userService.login(this.username.value, this.password.value);
    //     //   alert(this.userService.isLoggedIn());
    //        if (this.userService.isLoggedIn()) {
    //            // xxxx in following line, get orgid belonging to loggedin user.
    //            sessionStorage.setItem('OrgId', '680b4638-e23c-4bd6-72cd-08d58e2d9e43');
    //            //console.log('Login. OrgId: '+sessionStorage.getItem('OrgId'));
    //            this.router.navigate(['pages/dashboard']);
    //        }
            
    //    }
    //}

    public onSubmit(values: Object): void {
        this.loading = true;
        if (this.form.valid) {
            //    console.log(values);
            this.errorMessage$ = null;
            this.userService.login(this.username.value, this.password.value).subscribe(
                (val) => {
                    //  let result: AuthResult = JSON.parse(val.toString());
                    //   console.log("POST call successful value returned in body",val.auth_token);
                    sessionStorage.setItem('auth_token', val.auth_token);
                    // xxxx in following line, get orgid belonging to loggedin user.
                    sessionStorage.setItem('OrgId', '680b4638-e23c-4bd6-72cd-08d58e2d9e43');

                    var userConfig = this.authService.getUserClaims() as UserConfig;
                    sessionStorage.setItem('currentUser', JSON.stringify(userConfig));
                    
                    this.userService.loggedIn = true;
                    this.router.navigate(['pages/dashboard']);
                },
                (response: HttpErrorResponse) => {
                    try {
                        this.errorMessage$ = response.error.errorDescription[0];

                    }
                    catch (e) {
                        let errorMsg: any = 'Unknown server error';
                        this.errorMessage$ = errorMsg;
                    }

                    this.loading = false;

                },
                () => {
                    // console.log("The POST observable is now completed.");
                });


        }
    }

    public ngAfterViewInit(): void {
        document.getElementById('preloader').style['display'] = 'none';
    }
}

export function emailValidator(control: FormControl): {[key: string]: any} {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;    
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
}
