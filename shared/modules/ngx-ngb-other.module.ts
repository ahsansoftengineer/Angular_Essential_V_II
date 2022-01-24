import { NgModule } from '@angular/core';
// Other Modules
import { UiSwitchModule } from 'ngx-toggle-switch';
// import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxCurrencyModule } from "ngx-currency";
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/app.module';
import { HttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
// import { ToastrModule } from 'ngx-toastr';
// const MY_FORMATS = {
//   parse: {
//     dateInput: 'LL',
//   },
//   display: {
//     dateInput: 'YYYY-MM-DD',
//     monthYearLabel: 'YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'YYYY',
//   },
// };

const nGX_NGB_Other_Module = [
  NgxMatIntlTelInputModule,
  NgxDaterangepickerMd,
  NgxMatSelectSearchModule,
  NgxSpinnerModule,
  NgxCurrencyModule,
  UiSwitchModule,
  ShareButtonsModule,
  ShareIconsModule,
  NgSelectModule,
  NgxDaterangepickerMd.forRoot(),
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

];
@NgModule({
  imports: [nGX_NGB_Other_Module],
  exports: [nGX_NGB_Other_Module],
})
export class NGX_NGB_Other_Module {}
