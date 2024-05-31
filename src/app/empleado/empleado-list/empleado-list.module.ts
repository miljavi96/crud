import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmpleadoListPageRoutingModule } from './empleado-list-routing.module';

import { EmpleadoListPage } from './empleado-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmpleadoListPageRoutingModule
  ],
  declarations: [EmpleadoListPage]
})
export class EmpleadoListPageModule {}
