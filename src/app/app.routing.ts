import { Routes, CanActivate, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ErrorComponent } from './pages/error/error.component';

import { AuthGuard } from './shared/services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' },
  { path: 'forgotpassword', loadChildren: 'app/pages/forgot-password/forgot-password.module#ForgotPasswordModule' },
  { path: '**', component: ErrorComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
   // useHash: true
});