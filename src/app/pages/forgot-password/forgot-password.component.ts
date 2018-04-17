import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../shared/services/user.service';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'ahs-forgot-password',
    encapsulation: ViewEncapsulation.None,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    public form: FormGroup;
    public email: AbstractControl;
    public errorMessage$: Observable<string>;
    public successMessage$: Observable<string>;
    loading: boolean;

    constructor(private router: Router, fb: FormBuilder, private userService: UserService) {
        //   this.router = router;
        this.form = fb.group({
            'email': ['', Validators.compose([Validators.required, emailValidator])],
        });

        this.email = this.form.controls['email'];
    }

    ngOnInit() {
        this.errorMessage$ =  null;
        this.successMessage$ = null;

      //  this.errorMessage$.subscribe();
      //  this.successMessage$.subscribe();
  }

    public onSubmit(values: Object): void {
        this.errorMessage$ = null;
        this.successMessage$ = null;

      if (this.form.valid) {
          this.loading = true;
          this.userService.requestPassword(this.email.value).subscribe(
              (val) => {
                  //  let result = JSON.parse(val.toString());
                  console.log(val['result']);
                  this.successMessage$ = val.result;
                  this.loading = false;
                  //  this.router.navigate(['pages/dashboard']);
              },
              (response: HttpErrorResponse) => {
                  this.errorMessage$ = response.error.errorDescription[0];
                  this.loading = false;
              },
              () => {
                  this.loading = false;
                  // console.log("The POST observable is now completed.");
              });
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