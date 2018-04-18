import 'pace';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import { AgmCoreModule } from '@agm/core';

import { routing } from './app.routing';
import { AppConfig } from './app.config';

import { AppComponent } from './app.component';
import { ErrorComponent } from './pages/error/error.component';

import { AuthGuard } from './shared/services/auth.guard';
import { AuthService } from './shared/services/auth.service';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './shared/services/user.service';

//import { FeaturesService } from './shared/services/features.service';



import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/utils/auth-interceptor';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

import { ConfigService } from './shared/utils/config.service';
import { AutofocusDirective } from './autofocus.directive';

import { ExistingUsernameValidatorDirective } from './shared/services/validation.service';
import { LabListusersComponent } from './pages/admin-console/labs/lab-listusers/lab-listusers.component';
import { LabEdituserComponent } from './pages/admin-console/labs/lab-edituser/lab-edituser.component';

export function tokenGetter() {
    return sessionStorage.getItem('auth_token');
  //  return localStorage.getItem('auth_token');
}
// This is a comment

@NgModule({
  declarations: [
        AppComponent,
        ErrorComponent,
        AutofocusDirective,
        ExistingUsernameValidatorDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
  //  AgmCoreModule.forRoot({
  //    apiKey: 'AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE'
  //  }),
      routing,
      HttpClientModule,
      LoadingModule.forRoot({
          animationType: ANIMATION_TYPES.circle,
          //backdropBackgroundColour: 'rgba(0,0,0,0.1)',
          backdropBackgroundColour: 'rgba(128,128,128,0.8)',
          backdropBorderRadius: '4px',
          //primaryColour: '#ffffff',
          //secondaryColour: '#ffffff',
          //tertiaryColour: '#ffffff'
          primaryColour: '#DCDCDC',     // lightgray / lightgrey
          secondaryColour: '#000000',   // black    '#C0C0C0',   // silver
          //tertiaryColour: '#808080'   // gray/grey
          tertiaryColour: '#25383C'     // dark slate gray
      }),
      JwtModule.forRoot({
          config: {
              tokenGetter: tokenGetter,
              whitelistedDomains: ['localhost:4200', 'ahsjustifyapi.azurewebsites.net',  'ahsjustifyportal.azurewebsites.net'],
              blacklistedRoutes: ['localhost:4200/auth/']
          }
      })
  ],
    providers: [AppConfig, AuthGuard, AuthService, UserService, ConfigService,
                    
      {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
