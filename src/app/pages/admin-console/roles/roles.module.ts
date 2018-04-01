import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { PipesModule } from '../../../theme/pipes/pipes.module';

import { EditroleComponent } from './editrole/editrole.component';
import { ListrolesComponent } from './listroles/listroles.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RolesService } from './roles.service';

export const routes = [
    { path: '', redirectTo: 'listroles', pathMatch: 'full' },
    { path: 'listroles', component: ListrolesComponent, data: { breadcrumb: 'View Role' } },
    { path: 'editrole/:id', component: EditroleComponent, data: { breadcrumb: 'Update Role' } },
];


@NgModule({
  imports: [
      CommonModule,
      NgxDatatableModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes)
    ],
//    entryComponents: [ListrolesComponent],
  providers: [RolesService],
    declarations: [EditroleComponent, ListrolesComponent],
    //??
    exports: [EditroleComponent, ListrolesComponent]
})
export class RolesModule { }
