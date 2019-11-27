import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Registration} from  './registration';



const routes: Routes = [
    {
        path: '',
        component: Registration,

    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Routing {
    navigate(arg0: string[]) {
        throw new Error("Method not implemented.");
    }
}
