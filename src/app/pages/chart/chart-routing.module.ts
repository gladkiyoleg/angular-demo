import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartListPageComponent } from './pages/chart-list-page/chart-list-page.component';
import { ChartOneComponent } from './components/chart-one/chart-one.component';
import { ChartCurrencyPageComponent } from './pages/chart-currency-page/chart-currency-page.component';


const routes: Routes = [
  {
    path: '',
    component: ChartListPageComponent,
  },
  {
    path: 'one',
    component: ChartOneComponent,
  },
  {
    path: 'currency',
    component: ChartCurrencyPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartRoutingModule {
}
