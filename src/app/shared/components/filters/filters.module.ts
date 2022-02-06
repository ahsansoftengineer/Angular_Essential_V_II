import { NgModule } from '@angular/core';
import { MaterialModule } from '../../modules/material.module';
import { NGX_NGB_Other_Module } from '../../modules/ngx-ngb-other.module';
import { ControlModule } from '../control/control.module';
import { TransactionDialogComponent } from './transaction-dialog/transaction-dialog.component';

import { DirectiveModule } from '../../directive/directive.module';

const CommonComponents = [
  TransactionDialogComponent,
]

@NgModule({
  declarations: [
    CommonComponents
  ],
  imports: [
    MaterialModule,
    NGX_NGB_Other_Module,
    ControlModule,
    DirectiveModule
  ],
  exports:[
    CommonComponents,
  ]
})
export class FiltersModule { }
