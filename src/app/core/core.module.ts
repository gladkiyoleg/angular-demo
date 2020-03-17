import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './pages/bootstrap/app.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { MainHeaderComponent } from './layouts/main-header/main-header.component';

const COMPONENTS = [
  AppComponent,
  MainLayoutComponent,
  MainHeaderComponent,
  NotFoundPageComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
  ],
  exports: [
    ...COMPONENTS,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
  ],
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
    };
  }
}
