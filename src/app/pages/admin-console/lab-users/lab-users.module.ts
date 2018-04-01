import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { PipesModule } from '../../../theme/pipes/pipes.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { EditLabUserComponent } from './edit-lab-user/edit-lab-user.component';

import { LabUserService } from "./lab-user.service";
import { ListLabUserComponent } from './list-lab-user/list-lab-user.component';



export const routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'create', component: EditLabUserComponent, data: { breadcrumb: 'Create Lab User' } },
    { path: 'create/:id', component: EditLabUserComponent, data: { breadcrumb: 'Edit Lab User' } },
    // { path: 'edit/:id', component: CreateOrgUserComponent, data: { breadcrumb: 'Edit AHS User' } },
    { path: 'list', component: ListLabUserComponent, data: { breadcrumb: 'Lab Users' } },

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
  declarations: [EditLabUserComponent, ListLabUserComponent],
  providers: [LabUserService]
})
export class LabUsersModule { }
