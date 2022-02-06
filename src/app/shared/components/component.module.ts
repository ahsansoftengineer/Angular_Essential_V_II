import { NgModule } from '@angular/core';
import { MaterialModule } from '../modules/material.module';
import { NGX_NGB_Other_Module } from '../modules/ngx-ngb-other.module';
import { ControlModule } from './control/control.module';
import { DialogsModule } from './dialogs/dialogs.module';
import { FiltersModule } from './filters/filters.module';
import { TableModule } from './table/table.module';
import { UtilsModule } from './utils/utils.module';

const CommonModulez = [
  ControlModule,
  DialogsModule,
  FiltersModule,
  UtilsModule,
  TableModule
]
@NgModule({
  declarations: [
  ],
  imports: [
    MaterialModule,
    NGX_NGB_Other_Module,
    CommonModulez
  ],
  exports:[
    CommonModulez
  ]
})
export class ComponentModule { }
