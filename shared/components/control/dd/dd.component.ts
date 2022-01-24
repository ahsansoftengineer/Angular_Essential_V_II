import { Component, Injector, OnInit } from '@angular/core';
import { BaseControlDDComponent } from '../base-control-dd.component';

@Component({
  selector: 'di-dd',
  templateUrl: './dd.component.html',
  styleUrls: ['./dd.component.css'],
  host: { class: 'col-lg-3 col-md-4 p-0' },
})
//Dropdown
export class DdComponent extends BaseControlDDComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    super.ngOnInit();    
  }
}
