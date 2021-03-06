import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../theme/directives/directives.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { OrgUsersModule } from './org-users/org-users.module';
import { LabPreferencesComponent } from './labs/lab-preferences/lab-preferences.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import {LabProfileComponent} from "./labs/lab-profile/lab-profile.component";



export const routes = [
    { path: '', redirectTo: 'features', pathMatch: 'full' },
    //{ path: 'features', component: FeaturesComponent, data: { breadcrumb: 'Features' } },
    //{ path: 'roles', component: RolesComponent, data: { breadcrumb: 'Roles' } },
    //{ path: 'viewrole/:id', component: ViewroleComponent, data: { breadcrumb: 'View Role' } },
    //{ path: 'editrole/:id', component: EditroleComponent, data: { breadcrumb: 'Update Role' } },
    //{
    //    //path: 'editrole/:id/:name/:o/:l/:mp/:e', component: EditroleComponent,
    //    //    data: { breadcrumb: 'Update Role' }
    //    path: 'editrole/:id', component: EditroleComponent, data: { breadcrumb: 'Update Role' }
    //},

    //{ path: 'org-profile', component: OrgProfileComponent, data: { breadcrumb: 'AHS Profiles' } },
    { path: 'org-users', loadChildren: 'app/pages/admin-console/org-users/org-users.module#OrgUsersModule', data: { breadcrumb: 'AHS Users' } },
    { path: 'labs', loadChildren: 'app/pages/admin-console/labs/labs.module#LabsModule', data: { breadcrumb: 'Lab Profiles' } },
    //{ path: 'lab-preferences', component: LabPreferencesComponent, data: { breadcrumb: 'Lab Preferences' } },
    { path: 'lab-users', loadChildren: 'app/pages/admin-console/lab-users/lab-users.module#LabUsersModule', data: { breadcrumb: 'Lab Users' } },
    { path: 'mp-profile', loadChildren: 'app/pages/admin-console/mp-profile/mp-profile.module#MpProfileModule', data: { breadcrumb: 'Medical Practice Profiles' } },
  //  { path: 'mp-locations', component: MpLocationsComponent, data: { breadcrumb: 'Medical Practice Locations' } },
    { path: 'mp-users', loadChildren: 'app/pages/admin-console/mpusers/mpusers.module#MpusersModule', data: { breadcrumb: 'Medical Practice Users' } },
    { path: 'roles', loadChildren: 'app/pages/admin-console/roles/roles.module#RolesModule', data: { breadcrumb: 'Roles' } },
    { path: 'features', loadChildren: 'app/pages/admin-console/features/features.module#FeaturesModule', data: { breadcrumb: 'Features' } },
    { path: 'orgs', loadChildren: 'app/pages/admin-console/orgs/orgs.module#OrgsModule', data: { breadcrumb: 'Orgs' } },
    //{ path: 'orgs', component: EditorgComponent, data: { breadcrumb: 'AHS' } },
];


@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      NgxDatatableModule,
      DirectivesModule,
      PipesModule,
      RouterModule.forChild(routes)
    ],
    declarations: [

    ]
})
export class AdminConsoleModule { }
