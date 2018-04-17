import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';


import { ForgotPasswordComponent } from './forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';





export const routes = [
    { path: '', component: ForgotPasswordComponent, pathMatch: 'full' },
    { path: 'reset', component: ResetPasswordComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes),
      LoadingModule.forRoot({
          animationType: ANIMATION_TYPES.wanderingCubes,
          backdropBackgroundColour: 'rgba(0,0,0,0.1)',
          backdropBorderRadius: '4px',
          primaryColour: '#ffffff',
          secondaryColour: '#ffffff',
          tertiaryColour: '#ffffff'
      }),
  ],
  declarations: [ForgotPasswordComponent, ResetPasswordComponent]
})
export class ForgotPasswordModule { }
