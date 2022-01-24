import { Component, Injector, OnChanges, OnInit, SimpleChanges }
from '@angular/core';
import { BaseControlACComponent } from '../base-control-ac.component';

@Component({
  selector: 'my-ac',
  templateUrl: './ac.component.html',
  styleUrls: ['./ac.component.css'],
  host: { class: 'col-lg-3 col-md-4 p-0' },
  inputs:['search', 'updateValidity']
})
// AutoComplete
export class AcComponent extends BaseControlACComponent implements OnInit  {
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    super.ngOnInit();
  }
}




