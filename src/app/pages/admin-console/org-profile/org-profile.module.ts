import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { PipesModule } from '../../../theme/pipes/pipes.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { OrgProfileComponent } from './org-profile.component';
import { OrgProfileService } from "./org-profile.service";


export const routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: OrgProfileComponent, data: { breadcrumb: 'Organization' } },

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
  declarations: [OrgProfileComponent],

  providers: [OrgProfileService]
})
export class OrgProfileModule { }
