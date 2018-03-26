import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { PipesModule } from '../../../theme/pipes/pipes.module';

import { EditLabUserComponent } from './edit-lab-user/edit-lab-user.component';

import { LabUserService } from "./lab-user.service";
import { ListLabUserComponent } from './list-lab-user/list-lab-user.component';



export const routes = [
    { path: '', redirectTo: 'create', pathMatch: 'full' },
    { path: 'create', component: EditLabUserComponent, data: { breadcrumb: 'Create AHS User' } },

];

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes)
  ],
  declarations: [EditLabUserComponent, ListLabUserComponent],
  providers: [LabUserService]
})
export class LabUsersModule { }
