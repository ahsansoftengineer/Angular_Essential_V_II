import { Component, Injector, OnInit}
from '@angular/core';
import { BaseControlACComponent } from '../base-control-ac.component';

@Component({
  selector: 'di-ac',
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
    if(!this.preobj)
      this.param.paramObj = {
        limit: 10,
        page: 1,
        organisation_id: this._http.org_id,
        system_id: this._http.sys_id,
      }
    super.ngOnInit();
    // if (this.childAC) this.controlSubscription('AC')
    if (this.loadFirstTen && this.load && this.prelist?.length < 1 && !this.preobj) {
      this.loadData(this.hardCodeParentId);
    } else if (!this.load && this.parentFC) {
      // this.loadByParentFormControl()
    } else {
      this.list = [...this.prelist];
    }
  }
}




