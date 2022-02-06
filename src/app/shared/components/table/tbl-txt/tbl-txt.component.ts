import { Component, Injector, Input, OnInit } from '@angular/core';
import { BaseControlComponent } from '../../control/base-control.component';

@Component({
  selector: 'di-tbl-txt',
  templateUrl: './tbl-txt.component.html',
  styleUrls: ['./tbl-txt.component.css'],
})
export class TblTxtComponent
  extends BaseControlComponent
  implements OnInit
{
  @Input('type') type: string = 'text';
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    super.ngOnInit();
  }
}
