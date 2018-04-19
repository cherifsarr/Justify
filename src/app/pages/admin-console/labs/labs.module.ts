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
import { LabProfileService } from './services/lab-profile.service';
import { LabEditprofileComponent } from './lab-editprofile/lab-editprofile.component';
import { CommonService } from '../../../shared/utils/common.service';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import {LabListusersComponent} from "./lab-listusers/lab-listusers.component";
import {LabUsersService} from "./services/lab-users.service";
import { LabEdituserComponent } from './lab-edituser/lab-edituser.component';


export const routes = [
    { path: '', redirectTo: 'listlabprofiles', pathMatch: 'full' },
    { path: 'listlabprofiles', component: LabProfileComponent, data: { breadcrumb: 'List Lab Profile' } },
    { path: 'addlabprofile', component: LabEditprofileComponent, data: { breadcrumb: 'Create Lab Profile' } },
    { path: 'editlabprofile/:id', component: LabEditprofileComponent, data: { breadcrumb: 'Edit Lab Profile' }, 
        children: [
            { path: 'listlabusers',outlet: "userOutlet", component: LabListusersComponent, data: { breadcrumb: 'List of lab users' } },
            { path: 'editlabuser/:idLabUser', outlet: "userOutlet", component: LabEdituserComponent, data: { breadcrumb: 'Add/Edit Lab User' } },
            { path: 'labpreference',outlet: "preferenceOutlet", component: LabPreferencesComponent, data: { breadcrumb: 'Lab Preference' } },
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
  declarations: [LabPreferencesComponent, LabListusersComponent, LabProfileComponent, LabEditprofileComponent, LabEdituserComponent],
  providers: [LabProfileService, CommonService, LabUsersService]
})
export class LabsModule { }
