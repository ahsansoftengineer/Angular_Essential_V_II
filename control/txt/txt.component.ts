import {
  Component,
  Injector,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseControlComponent } from '../base-control.component';

@Component({
  selector: 'my-txt',
  templateUrl: './txt.component.html',
  styleUrls: ['./txt.component.css'],
  host: { class: 'col-lg-3 col-md-4 p-0' },
})
// Text Control
export class TxtComponent
  extends BaseControlComponent
  implements OnInit, OnChanges
{
  @Input() type: string = 'text';
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    super.ngOnInit();
    if(this.disabled)
      this.control.disable();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes?.disabled?.currentValue != undefined) {
      if (this.control && changes?.disabled?.currentValue) {
        this.control.disable();
      } else if(this.control && !changes?.disabled?.currentValue){
        this.control.enable();
      }
    }
  }
}
