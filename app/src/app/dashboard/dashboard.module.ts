import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule, dashboardRoutingDeclarations } from './dashboard-routing.module';
import { MatTableModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    ...dashboardRoutingDeclarations
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,

	  MatTableModule,
	  MatButtonModule
  ]
})
export class DashboardModule {
}
