import { NgModule } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { NGX_NGB_Other_Module } from '../../modules/ngx-ngb-other.module';
import { ColDDComponent } from './col-dd/col-dd.component';
import { ColTxtComponent } from './col-txt/col-txt.component';
import { ColNoneComponent } from './col-none/col-none.component';
import { ColSortComponent } from './col-sort/col-sort.component';
import { TblComponent } from './tbl/tbl.component';
import { TblACComponent } from './tbl-ac/tbl-ac.component';
import { TblDDComponent } from './tbl-dd/tbl-dd.component';
import { TblTxtComponent } from './tbl-txt/tbl-txt.component';
import { DiPaginatorComponent } from './di-paginator/di-paginator.component';
import { TblDateComponent } from './tbl-date/tbl-date.component';

const control = [
  ColDDComponent,
  ColTxtComponent,
  ColNoneComponent,
  ColSortComponent,
  TblComponent,
  TblACComponent,
  TblDDComponent,
  TblTxtComponent,
  DiPaginatorComponent,
  TblDateComponent
];
@NgModule({
  declarations: [control],
  imports: [MaterialModule, NGX_NGB_Other_Module],
  exports: [control],
})
export class TableModule {}
