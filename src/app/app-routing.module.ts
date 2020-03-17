import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';
import { ChartComponent } from './pages/chart/chart.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    loadChildren: () => import('./pages/movies/movies.module').then((m) => m.MoviesModule),
  },
  {
    path: 'chart',
    component: ChartComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
