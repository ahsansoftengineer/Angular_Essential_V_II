import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberTostring'
})
export class NumberTostringPipe implements PipeTransform {


  transform(value: any): any {
    this.NumInWords(value);
  }

   NumInWords (number) {
  }

}
