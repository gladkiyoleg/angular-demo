import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ChartComponent } from './pages/chart/chart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/movie',
    pathMatch: 'full',
  },
  {
    path: 'movie',
    component: HomeComponent,
  },
  {
    path: 'movie/:id',
    component: HomeComponent,
  },
  {
    path: 'chart',
    component: ChartComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
