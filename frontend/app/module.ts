import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { Routing } from './routing';
import { AppComponent } from './components/app.component';


@NgModule({
  declarations: [
    AppComponent,
   
  
  ],
  imports: [
    NgbModule,
    BrowserModule,
    Routing,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class Module { }
