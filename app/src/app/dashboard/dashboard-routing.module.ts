import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users/users.component';
import { AnimalsComponent } from './animals/animals.component';
import { CarsComponent } from './cars/cars.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        children: [
          {
            path: 'users',
            component: UsersComponent
          },
          {
            path: 'animals',
            component: AnimalsComponent
          },
          {
            path: 'cars',
            component: CarsComponent
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}

export const dashboardRoutingDeclarations = [
  DashboardComponent,
  UsersComponent,
  AnimalsComponent,
  CarsComponent
];
