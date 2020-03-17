import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesListPageComponent } from './pages/movies-list-page/movies-list-page.component';


const routes: Routes = [
  {
    path: '',
    component: MoviesListPageComponent,
  },
  {
    path: ':id',
    component: MoviesListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {
}
