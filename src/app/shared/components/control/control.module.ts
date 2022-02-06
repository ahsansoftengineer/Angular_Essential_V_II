import { NgModule } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { NGX_NGB_Other_Module } from '../../modules/ngx-ngb-other.module';
import { AcComponent } from './ac/ac.component';
import { CellComponent } from './cell/cell.component';
import { CurrencyComponent } from './currency/currency.component';
import { DateComponent } from './date/date.component';
import { DdComponent } from './dd/dd.component';
import { DddComponent } from './ddd/ddd.component';
import { ImageComponent } from './image/image.component';
import { TxtComponent } from './txt/txt.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { Ac2Component } from './ac2/ac2.component';
import { PipesModule } from '../../pipes/pipes.module';

const CommonFields = [
  TxtComponent,
  DdComponent,
  DddComponent,
  AcComponent,
  CellComponent,
  CurrencyComponent,
  DateComponent,
  ImageComponent,
  FileUploaderComponent,
  Ac2Component,
]
@NgModule({
  declarations: [
    CommonFields,
  ],
  imports: [
    MaterialModule,
    NGX_NGB_Other_Module,
    PipesModule
  ],
  exports:[
    CommonFields,
  ]
})
export class ControlModule { }
