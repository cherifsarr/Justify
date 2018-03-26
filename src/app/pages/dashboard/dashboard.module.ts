import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../theme/directives/directives.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { DashboardComponent } from './dashboard.component';

export const routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    PipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent,
  ]
})

export class DashboardModule { }
