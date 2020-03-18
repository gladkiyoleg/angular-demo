import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartOneComponent } from './components/chart-one/chart-one.component';


const routes: Routes = [
  {
    path: '',
    component: ChartOneComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartRoutingModule { }
