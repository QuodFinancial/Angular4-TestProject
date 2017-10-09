import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule, dashboardRoutingDeclarations } from './dashboard-routing.module';
import {MatTableModule} from '@angular/material';

@NgModule({
  declarations: [
    ...dashboardRoutingDeclarations
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,

	  MatTableModule
  ]
})
export class DashboardModule {
}
