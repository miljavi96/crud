import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmpleadoEditPage } from './empleado-edit.page';

const routes: Routes = [
  {
    path: '',
    component: EmpleadoEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoEditPageRoutingModule {}
