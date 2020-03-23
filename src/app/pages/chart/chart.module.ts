import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartRoutingModule } from './chart-routing.module';
import { CoreModule } from '../../core/core.module';
import { ChartOneComponent } from './components/chart-one/chart-one.component';
import { ChartSelectDateComponent } from './components/chart-select-date/chart-select-date.component';
import { ChartListPageComponent } from './pages/chart-list-page/chart-list-page.component';
import { ChartCurrencyPageComponent } from './pages/chart-currency-page/chart-currency-page.component';
import { ChartZoomableComponent } from './components/chart-zoomable/chart-zoomable.component';


@NgModule({
  declarations: [
    ChartOneComponent,
    ChartSelectDateComponent,
    ChartListPageComponent,
    ChartCurrencyPageComponent,
    ChartZoomableComponent,
  ],
  imports: [
    CommonModule,
    ChartRoutingModule,
    CoreModule.forRoot(),
  ],
})
export class ChartModule {
}
