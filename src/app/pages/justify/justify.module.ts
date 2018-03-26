import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DirectivesModule } from '../../theme/directives/directives.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { PgxComponent } from './pgx/pgx.component';
import { ToxicologyComponent } from './toxicology/toxicology.component';
import { CancerComponent } from './cancer/cancer.component';


export const routes = [
    { path: '', redirectTo: 'pgx', pathMatch: 'full' },
    { path: 'pgx', component: PgxComponent, data: { breadcrumb: 'Pgx Form' } },
    { path: 'toxicology', component: ToxicologyComponent, data: { breadcrumb: 'Toxicology Form' } },
    { path: 'cancer', component: ToxicologyComponent, data: { breadcrumb: 'Cancer Form' } }
];

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      DirectivesModule,
      PipesModule,
      RouterModule.forChild(routes)
  ],
  declarations: [PgxComponent, ToxicologyComponent, CancerComponent]
})
export class JustifyModule { }
