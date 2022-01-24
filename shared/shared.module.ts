import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './modules/material.module';
import { NGX_NGB_Other_Module } from './modules/ngx-ngb-other.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ComponentModule } from './components/component.module';
import { RouterModule } from '@angular/router';
import { NumberTostringPipe } from './pipes/numberTostring/number-tostring.pipe';


const CommonModules = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  MaterialModule,
  NGX_NGB_Other_Module,
  NgSelectModule,
  ComponentModule,
  // TranslateModule.forChild({
  //   loader: {
  //       provide: TranslateLoader,
  //       useFactory: HttpLoaderFactory,
  //       deps: [HttpClient]
  //   },
  //   isolate: false
  // })
]
@NgModule({
  imports: [ CommonModules ],
  exports: [ CommonModules , NumberTostringPipe],
  declarations: [
    NumberTostringPipe
  ],
})
export class SharedModule { }
