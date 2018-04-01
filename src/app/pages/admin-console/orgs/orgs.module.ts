import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { PipesModule } from '../../../theme/pipes/pipes.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OrgService } from './org.service';
import { Role } from '../../admin-console/roles/role';
import { LabService } from './lab.service';
import { UserService } from './user.service';
import { RolesService } from '../../admin-console/roles/roles.service';

import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';
//import { UsersComponent } from './users/users.component';
import { EditorgComponent } from './editorg/editorg.component';
import { EditroleComponent } from './editrole/editrole.component';
import { ListrolesComponent } from './listroles/listroles.component';
import { ListusersComponent } from './listusers/listusers.component';
import { EdituserComponent } from './edituser/edituser.component';

export const routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListComponent, data: { breadcrumb: 'Organizations' } },
    { path: 'profile/:id', component: ProfileComponent, data: { breadcrumb: 'Org Profile' } },
    //{ path: 'users/:id', component: UsersComponent, data: { breadcrumb: 'Org Users' } },
    { path: 'editorg/:id', component: EditorgComponent, data: { breadcrumb: 'Update Org' } },
];



@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
      ReactiveFormsModule,
    RouterModule.forChild(routes)
    ],
    providers: [OrgService, RolesService, LabService, UserService],
    declarations: [ListComponent, ProfileComponent, EditorgComponent,
                    ListrolesComponent, EditroleComponent, ListusersComponent, EdituserComponent]
})
export class OrgsModule { }
