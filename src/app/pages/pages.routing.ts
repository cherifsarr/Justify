import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages.component';
import { BlankComponent } from './blank/blank.component';
import { SearchComponent } from './search/search.component';

import { PatientsComponent } from './patients/patients.component';


export const routes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children:[
            { path:'', redirectTo:'dashboard', pathMatch:'full' },
            { path: 'dashboard', loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule', data: { breadcrumb: 'Dashboard' } },

            { path: 'justify', loadChildren: 'app/pages/justify/justify.module#JustifyModule', data: { breadcrumb: 'Justify' } },

            { path: 'patients', component: PatientsComponent, data: { breadcrumb: 'Patients' } },

            { path: 'admin-console', loadChildren: 'app/pages/admin-console/admin-console.module#AdminConsoleModule', data: { breadcrumb: 'Admin Console' } },

            { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } },
            { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } }
        ]
    }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);