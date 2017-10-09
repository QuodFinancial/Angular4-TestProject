import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AuthRouterModule, authRouterDeclarations } from './auth-router.module';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';





@NgModule({
  declarations: [
    ...authRouterDeclarations
  ],
  imports: [
    CommonModule,
    AuthRouterModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
      MatButtonModule
  ],
    exports: [
    CommonModule
],
})
export class AuthModule {
}
