/// <reference path="features/features.component.ts" />
//import { NgModule } from '@angular/core';
//import { CommonModule } from '@angular/common';
//import { FeaturesComponent } from './features/features.component';

//@NgModule({
//  imports: [
//    CommonModule
//  ],
//  declarations: [FeaturesComponent]
//})
//export class FeaturesModule { }



import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../../../theme/directives/directives.module';
import { PipesModule } from '../../../theme/pipes/pipes.module';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FeaturesService } from './features.service';
import { FeaturesComponent } from './features/features.component';

export const routes = [
    { path: '', redirectTo: 'features', pathMatch: 'full' },
    { path: 'features', component: FeaturesComponent, data: { breadcrumb: 'Features' } },
    //{ path: 'editrole/:id', component: EditroleComponent, data: { breadcrumb: 'Update Role' } },
];


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ],
    providers: [FeaturesService],
    declarations: [FeaturesComponent]
})
export class FeaturesModule { }
