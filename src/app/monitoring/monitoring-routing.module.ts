import { LuminosidadComponent } from './../luminosidad/luminosidad.component';
import { HumedadsComponent } from './../humedads/humedads.component';
import { HumedadrComponent } from './../humedadr/humedadr.component';
import { TemperaturaComponent } from './../temperatura/temperatura.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonitoringPage } from './monitoring.page';

const routes: Routes = [
  {
    path: '',
    component: MonitoringPage,
    children:[]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonitoringPageRoutingModule {}
