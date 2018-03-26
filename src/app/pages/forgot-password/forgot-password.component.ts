import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'ahs-forgot-password',
    encapsulation: ViewEncapsulation.None,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    public form: FormGroup;
    public email: AbstractControl;

    constructor(private router: Router, fb: FormBuilder, private userService: UserService) {
        //   this.router = router;
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, emailValidator])],
        });

        this.email = this.form.controls['email'];
    }

  ngOnInit() {
  }

  public onSubmit(values: Object): void {
      if (this.form.valid) {
          console.log(values);
        //  this.userService.login(this.username.value, this.password.value);
          this.router.navigate(['pages/dashboard']);

      }
  }

  public ngAfterViewInit(): void {
      document.getElementById('preloader').style['display'] = 'none';
  }

}

export function emailValidator(control: FormControl): { [key: string]: any } {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
    if (control.value && !emailRegexp.test(control.value)) {
        return { invalidEmail: true };
    }
}