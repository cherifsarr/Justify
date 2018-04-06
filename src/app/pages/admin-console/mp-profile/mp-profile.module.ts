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


export const routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: MpListprofileComponent, data: { breadcrumb: 'List Medical Practice Profile' } },
  { path: 'create', component: MpEditprofileComponent, data: { breadcrumb: 'Create Medical Practice Profile' } },
  { path: 'edit/:id', component: MpEditprofileComponent, data: { breadcrumb: 'Edit Medical Practice Profile' } },
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    PipesModule,
    NgxDatatableModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MpListprofileComponent, 
    MpEditprofileComponent, 
    MpListlocationComponent, 
    MpEditlocationComponent,
    ImageUploaderComponent 
  ],
  providers: [MPProfileService, MpLocationsService, LabProfileService]
})
export class MpProfileModule { }
