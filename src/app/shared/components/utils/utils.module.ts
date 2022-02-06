import { NgModule } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { NGX_NGB_Other_Module } from '../../modules/ngx-ngb-other.module';
import { LoaderComponent } from './loader/loader.component';

const Utils = [
  LoaderComponent,
]

@NgModule({
  declarations: [
    Utils,
  ],
  imports: [
    MaterialModule,
    NGX_NGB_Other_Module,

  ],
  exports:[
    Utils,
  ]
})
export class UtilsModule { }
