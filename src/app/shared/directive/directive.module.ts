import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasDirective } from './forms/has.directive';

const CommonComponents = [
  HasDirective
]

@NgModule({
  declarations: [
    CommonComponents
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CommonComponents,
  ]
})
export class DirectiveModule { }
