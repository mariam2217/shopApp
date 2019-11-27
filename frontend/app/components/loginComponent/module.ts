import { NgModule } from '@angular/core';



import { Routing } from './route';
import { LoginComponent } from './loginComponent';


@NgModule({
  declarations: [
    LoginComponent,
  
  ],
  imports: [
    Routing
  ],
  providers: [],
})
export class RegistrationModule { }