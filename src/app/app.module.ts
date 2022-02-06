import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoaderService } from './layouts/loader/loader.service';
import { LoaderComponent } from './layouts/loader/loader.component';
import { ToastrModule } from 'ngx-toastr';
import { RouterLinkCustomDirective } from './directives/external-link-directive/routerlinkcustom.directive';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoaderInterceptor } from './interceptors/loader-interceptors/loader.interceptor';
import { SpinnerComponent } from './shared/components/theme/spinner.component';
import { VerticalNavigationComponent } from './shared/components/theme/vertical-header/vertical-navigation.component';
import { BreadcrumbComponent } from './shared/components/theme/breadcrumb/breadcrumb.component';
import { VerticalSidebarComponent } from './shared/components/theme/vertical-sidebar/vertical-sidebar.component';
import { DatePipe } from '@angular/common';
import { SharedModule } from './shared/shared.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    BlankComponent,
    VerticalNavigationComponent,
    BreadcrumbComponent,
    VerticalSidebarComponent,
    LoaderComponent,
    RouterLinkCustomDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyDoliAneRffQDyA7Ul9cDk3tLe7vaU4yP8' }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastrModule.forRoot({
      enableHtml :  true,
      progressBar: true,
      closeButton: true,
      onActivateTick: false,
      timeOut:0,
      toastClass: 'toast',
      positionClass: 'toast-top-right',
    }),
    BrowserAnimationsModule,
],
  exports: [
    HttpClientModule
  ],
  providers: [
    // {
    //   provide: PERFECT_SCROLLBAR_CONFIG,
    //   useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    LoaderService,
    CookieService,
    DatePipe

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
