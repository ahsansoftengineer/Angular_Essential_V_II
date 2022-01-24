import {
  Component,
  Injector,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { CurrencyMaskInputMode } from 'ngx-currency';
import { BaseControlComponent } from '../base-control.component';

@Component({
  selector: 'my-component-name-here',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css'],
})
export class CurrencyComponent
  extends BaseControlComponent
  implements OnInit, OnChanges
{
  control: FormControl;
  @Input('options') options = {
    suffix: ' PKR',
    prefix: 'Rs',
    thousands: ',',
    decimal: '.',
    inputMode: CurrencyMaskInputMode.NATURAL,
  };
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    super.ngOnInit();
    if (this.disabled) this.control.disable();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (
      changes?.disabled?.currentValue == true ||
      changes?.disabled?.currentValue == false
    ) {
      if (this.control && changes?.disabled?.currentValue) {
        this.control.disable();
      } else if (this.control && !changes?.disabled?.currentValue) {
        this.control.enable();
      }
    }
  }
}
// export interface CurrencyMaskConfig {
//   align: string;
//   allowNegative: boolean;
//   allowZero: boolean;
//   decimal: string;
//   precision: number;
//   prefix: string;
//   suffix: string;
//   thousands: string;
//   nullable: boolean;
//   min?: number;
//   max?: number;
//   inputMode?: CurrencyMaskInputMode;
// }
