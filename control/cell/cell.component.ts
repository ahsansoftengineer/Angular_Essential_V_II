import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseControlComponent } from '../base-control.component';

@Component({
  selector: 'my-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
  host: { class: 'col-lg-3 col-md-4 p-0' },
})
export class CellComponent extends BaseControlComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }
  @ViewChild('phone') phone
  ngOnInit(): void {
    super.ngOnInit();
    this.control?.valueChanges?.subscribe(x => {
      if(!this.emptyCheck(x) && this.control.pristine)
      this.phone.phoneNumber = ''
    })
  }
}
