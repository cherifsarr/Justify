import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../../shared/services/user.service';
import { PasswordReset } from '../../../shared/models/passwordReset';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
    selector: 'ahs-reset-password',
    encapsulation: ViewEncapsulation.None,
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    public form: FormGroup;
    public password: AbstractControl;
    public confirmPassword: AbstractControl;
    private passwordResetConfig: PasswordReset;
    public errorMessage$: Observable<string>;
    public successMessage$: Observable<string>;
    loading: boolean;


    constructor(private router: Router, private route: ActivatedRoute, fb: FormBuilder,  private userService: UserService) {
        this.form = fb.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
        },  { validator: matchingPasswords('password', 'confirmPassword') });

        this.password = this.form.controls['password'];
        this.confirmPassword = this.form.controls['confirmPassword'];
        this.passwordResetConfig = new PasswordReset();
    }

    ngOnInit() {

            this.errorMessage$ = null;
            this.successMessage$ = null;
            let params = this.route.snapshot.queryParams;
            console.log(params);
            this.passwordResetConfig.email = params['email'];
            this.passwordResetConfig.code = params['conf'];

    }

    public onSubmit(values: Object): void {
        this.errorMessage$ = null;
        this.successMessage$ = null;

        if (this.form.valid) {
            this.loading = true;
            //    alert(this.form.get('username').value);
            this.passwordResetConfig.password = this.form.get('password').value; // this.form.controls['username'].value;

            //  alert(this.user.userName);
            this.userService.resetPassword(this.passwordResetConfig).subscribe(
                (val) => {
                    this.successMessage$ = val.result;
                    this.loading = false;
                    return true;
                },
                (response: HttpErrorResponse) => {
                    this.errorMessage$ = response.error.errorDescription[0];
                    this.loading = false;
                },
                () => {
                  // Completed
                    this.loading = false;
                });
        }
    }


  public ngAfterViewInit(): void {
      document.getElementById('preloader').style['display'] = 'none';
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
