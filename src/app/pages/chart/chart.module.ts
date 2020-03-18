import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartRoutingModule } from './chart-routing.module';
import { CoreModule } from '../../core/core.module';
import { ChartOneComponent } from './components/chart-one/chart-one.component';


@NgModule({
  declarations: [
    ChartOneComponent,
  ],
  imports: [
    CommonModule,
    ChartRoutingModule,
    CoreModule.forRoot(),
  ],
})
export class ChartModule {
}
