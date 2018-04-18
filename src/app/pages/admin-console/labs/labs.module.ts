import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LabPreferencesComponent} from "./lab-preferences/lab-preferences.component";
import {LabProfileComponent} from "./lab-profile/lab-profile.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DirectivesModule} from "../../../theme/directives/directives.module";
import {PipesModule} from "../../../theme/pipes/pipes.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {InternationalPhoneModule} from "ng4-intl-phone";
import {RouterModule} from "@angular/router";
import { LabsNavComponent } from './labs-nav.component';
import { LabProfileService } from './services/lab-profile.service';
import { LabEditprofileComponent } from './lab-editprofile/lab-editprofile.component';
import { CommonService } from '../../../shared/utils/common.service';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import {LabListusersComponent} from "./lab-listusers/lab-listusers.component";
import {LabUsersService} from "./services/lab-users.service";
import {LabEdituserComponent} from "./lab-edituser/lab-edituser.component";



export const routes = [
    { path: '', redirectTo: 'labsnav', pathMatch: 'full' },
    {
        path: 'labsnav', component: LabsNavComponent, data: { breadcrumb: 'Lab Profile' }, children: [
            { path: '', redirectTo:'listlabprofiles', pathMatch:'full' },
            { path: 'listlabprofiles', component: LabProfileComponent, data: { breadcrumb: 'List lab profile' } },
            { path: 'editlabprofile/:id', component: LabEditprofileComponent, data: { breadcrumb: 'add/update lab profile' } },
            { path: 'listlabusers', component: LabListusersComponent, data: { breadcrumb: 'List lab users' } },
            { path: 'editlabuser/:id', component: LabEdituserComponent, data: { breadcrumb: 'add/update lab user' } },
            { path: 'labpreference', component: LabPreferencesComponent, data: { breadcrumb: 'lab preference' } },
        ]
    },
];

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      DirectivesModule,
      PipesModule,
      NgxDatatableModule,
      InternationalPhoneModule,
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
  declarations: [LabPreferencesComponent, LabListusersComponent, LabProfileComponent, LabsNavComponent, LabEditprofileComponent, LabEdituserComponent],
  providers: [LabProfileService, CommonService, LabUsersService]
})
export class LabsModule { }
