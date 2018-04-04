import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../shared/services/user.service';


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

    constructor(private router: Router, fb: FormBuilder, private userService: UserService) {
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

    public onSubmit(values:Object):void {
        if (this.form.valid) {
        //    console.log(values);
            this.userService.login(this.username.value, this.password.value);
         //   alert(this.userService.isLoggedIn());
            if (this.userService.isLoggedIn()) {
                this.router.navigate(['pages/dashboard']);
            }
            
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
