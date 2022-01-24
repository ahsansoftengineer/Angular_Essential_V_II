import { Component, Injector, OnInit } from '@angular/core';
import { URLz } from 'src/app/enums/url.enum';
import { BaseControlBridgeComponent } from '../base-control-duplicate.component';

@Component({
  selector: 'hierarchy-dropdown',
  templateUrl: './hierarchy-dropdown.component.html',
  styleUrls: ['./hierarchy-dropdown.component.css']
})
export class HierarchyDropdownComponent extends BaseControlBridgeComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    super.ngOnInit();
  }
  controlSubscription(){
    this.control?.valueChanges?.subscribe((val) => {
      if(this.url === URLz.ORG){
        this._http.org_id = val
      } else if (this.url === URLz.ORG_SYSTEM){
        this._http.sys_id = val
      }
      this.loadChild(val)
    });
  }
  loadData(){
    if (this.load) {
      this._http.selectOptionService({endpoint: this.url}).subscribe((res) => {
        this.list = res.data.records;
        if (this.list?.length === 1) {
          this.control.patchValue(this.list[0].id);
        }
      });
    } else {
      this.list = [...this.prelist];
    }
  }
  loadChild(val: string) {
    if(this.child){
      this._http
      .selectOptionService({endpoint: this.child.url, param: 'parent_id='+ val})
      .subscribe((res) => {
        this.child.list = res.data.records;
        // Check for Initial Case
        if (this.child.list?.length == 1) {
          // Check for Pathing Case
          if(this.child.control.value != this.child.list[0]?.id){
            this.child.control.patchValue(this.child.list[0]?.id)
          }
        }
      });
    }
  }
  setChildEmpty(childz: BaseControlBridgeComponent) {
    if (childz?.child) {
      this.setChildEmpty(childz?.child);
    }
    childz?.control?.patchValue(null)
    childz.list = null;
  }

}
