import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LabPreferencesComponent} from "./lab-preferences/lab-preferences.component";
import {LabUsersComponent} from "./lab-users/lab-users.component";
import {LabProfileComponent} from "./lab-profile/lab-profile.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DirectivesModule} from "../../../theme/directives/directives.module";
import {PipesModule} from "../../../theme/pipes/pipes.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {InternationalPhoneModule} from "ng4-intl-phone";
import {RouterModule} from "@angular/router";


export const routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: LabProfileComponent, data: { breadcrumb: 'Lab Profiles' } },

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
      RouterModule.forChild(routes)
  ],
  declarations: [LabPreferencesComponent, LabUsersComponent, LabProfileComponent]
})
export class LabsModule { }
