import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule, dashboardRoutingDeclarations } from './dashboard-routing.module';

@NgModule({
  declarations: [
    ...dashboardRoutingDeclarations
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule {
}
