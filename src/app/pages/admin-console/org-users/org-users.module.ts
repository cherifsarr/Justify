import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { PipesModule } from '../../../theme/pipes/pipes.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { CreateOrgUserComponent } from './create-org-user/create-org-user.component';
import { OrgUserService } from "./org-user.service";
import { ListOrgUserComponent } from './list-org-user/list-org-user.component';


export const routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'create', component: CreateOrgUserComponent, data: { breadcrumb: 'Create AHS User' } },
    { path: 'create/:id', component: CreateOrgUserComponent, data: { breadcrumb: 'Create AHS User' } },
   // { path: 'edit/:id', component: CreateOrgUserComponent, data: { breadcrumb: 'Edit AHS User' } },
    { path: 'list', component: ListOrgUserComponent, data: { breadcrumb: 'Find AHS User' } },
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
  declarations: [CreateOrgUserComponent, ListOrgUserComponent],
  providers: [OrgUserService]
})
export class OrgUsersModule { }
