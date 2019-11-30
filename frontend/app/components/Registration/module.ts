import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { Routing } from './route';
import { RegistrationComponent } from './registration';

@NgModule({
  declarations: [
    RegistrationComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    Routing
  ],
  providers: [],
})
export class RegistrationModule { }
