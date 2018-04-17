import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { PipesModule } from '../../../theme/pipes/pipes.module';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { OrgService } from './org.service';
import { Role } from '../../admin-console/roles/role';
import { LabService } from './lab.service';
import { UserService } from './user.service';
import { MpuserService } from '../mpusers/mpuser.service';
import { RolesService } from '../../admin-console/roles/roles.service';
import { CommonService } from '../../../shared/utils/common.service';
import { OrgUserService } from '../org-users/org-user.service';
import { FeaturesService } from '../features/features.service';

import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';
import { EditorgComponent } from './editorg/editorg.component';
import { EditroleComponent } from './editrole/editrole.component';
import { ListrolesComponent } from './listroles/listroles.component';
import { ListusersComponent } from './listusers/listusers.component';
import { EdituserComponent } from './edituser/edituser.component';
import { OrgmainComponent } from './orgmain.component';
import { id } from '@swimlane/ngx-datatable/release/utils';


export const routes = [
    { path: '', redirectTo: 'orgmain', pathMatch: 'full' },
    //{ path: 'list', component: ListComponent, data: { breadcrumb: 'Organizations' } },
    {
        path: 'orgmain/:id', component: OrgmainComponent, data: { breadcrumb: 'AHS' }, children: [
            { path: '', redirectTo: 'editorg', pathMatch: 'full' },
            //{ path: '**', component: EditorgComponent, data: { breadcrumb: 'AHS Profile' } },
            { path: 'editorg', component: EditorgComponent, data: { breadcrumb: 'AHS Profile' } },
            { path: 'listroles', component: ListrolesComponent, data: { breadcrumb: 'AHS - Roles' }},
            { path: 'listusers', component: ListusersComponent, data: { breadcrumb: 'AHS - Users', oid:id } },
            { path: 'edituser/:id', component: EdituserComponent, data: { breadcrumb: 'AHS - Add/Update User' } },
            { path: 'editrole/:id', component: EditroleComponent, data: { breadcrumb: 'AHS - Add/Update Role' } },
        ]
    },
];



@NgModule({
  imports: [
        CommonModule,NgxDatatableModule,ReactiveFormsModule,
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
    providers: [
        OrgService, RolesService, LabService, UserService, MpuserService,
        OrgUserService, CommonService, FeaturesService
    ],
    declarations: [
        ListComponent, ProfileComponent, EditorgComponent,
        ListrolesComponent, EditroleComponent,
        ListusersComponent, EdituserComponent, OrgmainComponent
    ],
})

export class OrgsModule {
    //oid: string;    // Org-Id

    constructor(private route: ActivatedRoute) {
        //this.route.params.subscribe(params => 
        //    this.oid = params['oid']
        //);
        // xxxx set this.oid by getting it from admin-console module
        //this.oid = '680b4638-e23c-4bd6-72cd-08d58e2d9e43';
        //console.log('OrgId: ' + this.oid);
    }
}
