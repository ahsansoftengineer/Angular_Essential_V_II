import { DatePipe } from '@angular/common';
import {
  Component,
  Injector,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { BaseControlComponent } from '../base-control.component';

@Component({
  selector: 'my-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
  host: { class: 'col-lg-3 col-md-4 p-0' },
})
export class DateComponent extends BaseControlComponent  implements OnInit, OnChanges{
  @Input() startAt: Date | null = null;
  @Input() startView: 'month' | 'year' | 'multi-year' = 'month';
  @Input() max: Date | null = null;
  @Input() min: Date | null = null;
  @Input() dateFormate: string =  'yyyy-MM-dd';
  datePipe: DatePipe
  constructor(injector: Injector) {
    super(injector);
    this.datePipe = injector.get(DatePipe)

  }
  ngOnInit(): void {
    super.ngOnInit();
    if (this.disabled) this.control.disable();
    this.control.valueChanges.subscribe(data => {
      this.control.patchValue(this.setFormThatDate(data), { emitEvent:false })
    })
  }
  // This could be change so the end developer can decide what format to put in the form
  setFormThatDate(selectedDate){
    return  this.datePipe.transform(selectedDate, this.dateFormate)
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes?.disabled?.currentValue != undefined) {
      if (this.control && changes?.disabled?.currentValue) {
        this.control.disable();
      } else if (this.control && !changes?.disabled?.currentValue) {
        this.control.enable();
      }
    }
  }
}
