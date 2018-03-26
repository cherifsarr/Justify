import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { PipesModule } from '../../../theme/pipes/pipes.module';

import { CreateOrgUserComponent } from './create-org-user/create-org-user.component';
import { OrgUserService } from "./org-user.service";
import { ListLabUsersComponent } from './list-lab-users/list-lab-users.component';


export const routes = [
    { path: '', redirectTo: 'create', pathMatch: 'full' },
    { path: 'create', component: CreateOrgUserComponent, data: { breadcrumb: 'Create AHS User' } },

];

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
  //    DirectivesModule,
  //    PipesModule,
      RouterModule.forChild(routes)
  ],
  declarations: [CreateOrgUserComponent, ListLabUsersComponent],
  providers: [OrgUserService]
})
export class OrgUsersModule { }
