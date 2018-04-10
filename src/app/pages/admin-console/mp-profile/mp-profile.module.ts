import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { PipesModule } from '../../../theme/pipes/pipes.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MpListprofileComponent } from './mp-listprofile/mp-listprofile.component';
import { MpEditprofileComponent } from './mp-editprofile/mp-editprofile.component';
import { MpListlocationComponent } from './mp-listlocation/mp-listlocation.component';
import { MpEditlocationComponent } from './mp-editlocation/mp-editlocation.component';
import { MPProfileService } from './services/mp-profile.service';
import { MpLocationsService } from './services/mp-locations.service';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';
import { LabProfileService } from './services/lab-profile.service';
import { MpListusersComponent } from './mp-listusers/mp-listusers.component';
import { MpEditusersComponent } from './mp-editusers/mp-editusers.component';
import { MpUsersService } from './services/mp-users.service';
import { InternationalPhoneModule } from 'ng4-intl-phone';

export const routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: MpListprofileComponent, data: { breadcrumb: 'List Medical Practice Profile' } },
  { path: 'create', component: MpEditprofileComponent, data: { breadcrumb: 'Create Medical Practice Profile' } },
  { path: 'edit/:id', component: MpEditprofileComponent, data: { breadcrumb: 'Edit Medical Practice Profile' }, 
      children: [
        {path: 'listlocations',outlet: "locationOutlet", component: MpListlocationComponent, data: { breadcrumb: 'List locations' } },
        {path: 'addlocation', outlet: "locationOutlet", component: MpEditlocationComponent, data: { breadcrumb: 'add location' } },
        {path: 'mpeditlocation/:idLocation', outlet: "locationOutlet", component: MpEditlocationComponent, data: { breadcrumb: 'Edit location' } },
        { path: 'listusers', outlet: "userOutlet", component:MpListusersComponent, data: { breadcrumb: 'Medical Practice Users' } },
        { path: 'adduser', outlet: "userOutlet", component:MpEditusersComponent, data: { breadcrumb: 'Edit Medical Practice Users' } },
        { path: 'edituser/:idUser', outlet: "userOutlet", component:MpEditusersComponent, data: { breadcrumb: 'Edit Medical Practice Users' } },
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
    RouterModule.forChild(routes)
  ],
  declarations: [
    MpListprofileComponent, 
    MpEditprofileComponent, 
    MpListlocationComponent, 
    MpEditlocationComponent,
    ImageUploaderComponent ,
    MpListusersComponent,
    MpEditusersComponent
  ],
  providers: [MPProfileService, MpLocationsService, LabProfileService, MpUsersService]
})
export class MpProfileModule { }
