import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppComponent } from './pages/bootstrap/app.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { MainHeaderComponent } from './layouts/main-header/main-header.component';
import { BaseInterceptor } from './interceptors/base.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
    MatListModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    ...COMPONENTS,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: BaseInterceptor,
          multi: true,
        },
      ],
    };
  }
}
