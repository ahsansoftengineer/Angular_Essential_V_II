import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberTostringPipe } from './number-tostring.pipe';
import { ErrorMessagePipe } from './error-message.pipe';


@NgModule({
  declarations: [
    NumberTostringPipe,
    ErrorMessagePipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ErrorMessagePipe
  ]
})
export class PipesModule {
}
