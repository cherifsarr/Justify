import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { PipesModule } from '../../../theme/pipes/pipes.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { EditMpuserComponent } from './edit-mpuser/edit-mpuser.component';
import { MpuserService } from "./mpuser.service";
import { ListMpusersComponent } from './list-mpusers/list-mpusers.component';


export const routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListMpusersComponent, data: { breadcrumb: 'Medical Practice Users' } },
    { path: 'create', component: EditMpuserComponent, data: { breadcrumb: 'Create Medical Practice User' } },
    { path: 'edit/id?', component: EditMpuserComponent, data: { breadcrumb: 'Edit Medical Practice User' } },

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
  declarations: [EditMpuserComponent, ListMpusersComponent],
  providers: [MpuserService]
})
export class MpusersModule { }