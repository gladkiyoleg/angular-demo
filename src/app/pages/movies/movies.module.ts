import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListItemComponent } from './components/movies-list-item/movies-list-item.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MoviesListPageComponent } from './pages/movies-list-page/movies-list-page.component';
import { CoreModule } from '../../core/core.module';


@NgModule({
  declarations: [
    MoviesListComponent,
    MoviesListItemComponent,
    MoviesListPageComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MatPaginatorModule,
    MatCardModule,
    MatChipsModule,
    CoreModule.forRoot(),
  ],
})
export class MoviesModule {
}
