import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthModule } from './auth/auth.module';

export function authModuleLoader() {
  return AuthModule;
}

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: authModuleLoader
      },
      {
        path: 'dashboard',
        loadChildren: 'app/dashboard/dashboard.module#DashboardModule'
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRouterModule {
}

