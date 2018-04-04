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

import { ConfigService } from './shared/utils/config.service';

export function tokenGetter() {
    return sessionStorage.getItem('auth_token');
  //  return localStorage.getItem('auth_token');
}
// This is a comment

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
  //  AgmCoreModule.forRoot({
  //    apiKey: 'AIzaSyDe_oVpi9eRSN99G4o6TwVjJbFBNr58NxE'
  //  }),
      routing,
      HttpClientModule,
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
