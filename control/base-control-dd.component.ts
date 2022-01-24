import { Component, Injector, OnInit } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { URLz } from 'src/app/enums/url.enum';
import { BaseControlBridgeComponent } from './base-control-select-bridge.component';

@Component({
  selector: 'my-base-control-dd',
  template: '',
})
//Dropdown
export class BaseControlDDComponent extends BaseControlBridgeComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    super.ngOnInit();
    if (this.child) this.controlSubscription('DD');
    if (this.childDD) this.controlSubscription('DD');
    if (this.childAC) this.controlSubscription('AC')
    if (this.load && this.prelist?.length < 1 && !this.preobj) {
      this.loadData(this.hardCodeParentId);
    } else if (!this.load && this.parentFC) {
      this.loadByParentFormControl()
    } else {
      this.list = [...this.prelist];
    }
  }
  controlSubscription(childType: string) {
    this.control?.valueChanges
      ?.pipe(
        distinctUntilChanged()
        // filter(x => x != null)
      )
      .subscribe((val) => {
        if (this.url === URLz.ORG) {
          this._http.org_id = val;
        } else if (this.url === URLz.ORG_SYSTEM) {
          this._http.sys_id = val;
        }
        if (childType === 'DD')
          this.loadChildDD(val);
        else if (childType === 'AC')
          this.loadChildAC(val)
      });
  }
  // For Form Control Parent
  loadByParentFormControl() {
    this.parentFC.valueChanges.subscribe(val => {
      if (this.emptyCheck(val))
        this.loadData(val)
      else this.setSelfEmpty()
    })
  }

}
