import {
  Component,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { URLz } from 'src/app/enums/url.enum';
import { ChangeEvent } from 'src/app/interface/common/change-event';
import { SelectOption } from 'src/app/interface/common/select';
import { BaseControlACComponent } from './base-control-ac.component';
import { BaseControlDDComponent } from './base-control-dd.component';
import { BaseControlComponent } from './base-control.component';

@Component({
  selector: 'my-base-control-bridge',
  template: '',
})
//Dropdown
export class BaseControlBridgeComponent
  extends BaseControlComponent
  implements OnInit {
  // Properties provided by Parent
  @Input() child: BaseControlBridgeComponent; // Will be deleted in next version
  @Input() childDD: BaseControlDDComponent;
  @Input() childAC: BaseControlACComponent;

  @Input() parentDD: BaseControlDDComponent;
  @Input() parentAC: BaseControlACComponent;

  // Will be replace by param
  @Input() hardCodeParentId: string = '';
  @Input() url: URLz;
  @Input() load = true;
  @Input() prelist: SelectOption[] = [];
  @Input() preobj: SelectOption;
  @Input() objName: string;
  @Input() parentKey: string = 'id'; // Sort out later

  // Variable and Function Hoisting in JavaScript
  // By doing that I can override this variable in Parent Component
  @Input() renderRow: Function = (data) => {
    return data.title;
  };
  @Output('changeEvent') changeEvents = new EventEmitter<ChangeEvent>();


  // Local Properties between DD / AC

  list: SelectOption[] = [];
  once = 0;
  // For Subscribing the Object availaible in
  // e.g. mateiral_item_id -> material_item -> itm_buyunit
  @Input('objSubs') objectSubscription: string;

  org_id: any;
  sys_id: any;
  parentCode: string;
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    super.ngOnInit();
    if (this.url)
    this.defaultParam.endpoint = this.url;
    this.setObjectInForm();
    // Subscribe to Object to Load Data
    if(this.objectSubscription)
      this.loadByObject();

  }
  changeEvent(changeEvent: ChangeEvent) {
    this.changeEvents?.emit(changeEvent);
    if (changeEvent?.event?.isUserInput) {
      let group = this.group?.get(this.objName)
      if (group) {
        group.patchValue(changeEvent.obj)
      }
    }
  }
  setObjectInForm(obj = null){
    // Form Object Case
    if (!this.objName && !this.preobj && obj == null) {
      this.objName = this.field.slice(0, this.field.lastIndexOf('_'))
      if (this.emptyCheck(this.group?.get(this.objName)?.value))
        this.preobj = this.group?.get(this.objName).value
    }
    if(obj != null && this.group?.get(this.objName)){
      this.preobj = obj
      this.group?.get(this.objName)?.patchValue(obj)
    }


  }
  setSelfEmpty() {
    if (this.control)
      this.control.patchValue('')
    this.list = [];
  }
  setChildEmpty(childz: BaseControlBridgeComponent) {
    if (childz?.child) {
      if (childz?.child?.list) childz.child.list = null;
      this.setChildEmpty(childz?.child);
    }
    childz?.control?.patchValue(null);
  }
  setChildACEmpty(childz: BaseControlACComponent) {
    if (childz?.childAC) {
      if (childz?.childAC?.list) {
        childz.child.list = null;
        childz.searchControl.patchValue('')
        childz._AutoCompleteSubscription();
      }
      this.setChildACEmpty(childz?.childAC);
    }
    childz?.control?.patchValue(null);
  }
  // Merge Them loadChild & loadChildDD;
  loadData(parentid = '') {
    let subscription;
    if (parentid == '')
      subscription = this._http.selectOptionService({
        endpoint: this.url,
        ...this.param
      });
    else subscription = this._http.selectOptionService({
      endpoint: this.url,
      param: 'parent_id=' + parentid
    });
    subscription.subscribe((res) => {
      this.list = res.data.records;
      if (this.list?.length === 1) {
        this.control?.patchValue(this?.list[0].id);
        this.setObjectInForm(this?.list[0])
      } else if (this.list?.length > 1) {
        let hasCurrentValue = false;
        this.list.forEach((parentList) => {
          if (parentList.id == this.control?.value) {
            hasCurrentValue = true;
          }
        });
        if (hasCurrentValue) this.control?.patchValue(this.control?.value)
      }
    });
  }
  // For Template Reference Variable Child
  loadChildDD(id: string, child: BaseControlBridgeComponent = this.child) {
    if (child && child.prelist.length < 1) {
      if (this.emptyCheck(id)) {
        this._http
          .selectOptionService({
            endpoint: child.url,
            param: 'parent_id=' + id,
            ...child?.param
          })
          .subscribe((res) => {
            child.list = res.data.records;
            // Check for Initial Case
            if (child?.list?.length > 0) {
              // Check for Pathing Case
              if (child?.list?.length == 1)
                child?.control?.patchValue(child?.list[0]?.id);
              let hasCurrentValue = false;
              child.list.forEach((childlist) => {
                if (childlist?.id == child?.control?.value)
                  hasCurrentValue = true;
              });
              if (!hasCurrentValue) this.setChildEmpty(child);
              if (hasCurrentValue)
                child?.control?.patchValue(child?.control?.value);
            } else {
              this.setChildEmpty(child);
            }
          });
      }
    }
  }
  loadByObject() {
    this.group.get(this.objectSubscription).valueChanges.subscribe(x => {
      if (this.emptyCheck(this.objectSubscription))
        this.loadData(x[this.parentKey])
    })
  }
  // Not yet Required in process
  // For Template Reference Variable Parent
  loadChildAC(id: any) {
    if (this.childAC && this.childAC.prelist.length < 1) {
      if (this.emptyCheck(id)) {
        this.childAC.list = [];
        this.childAC.searchControl.patchValue('')
        this.childAC.control.patchValue('')
        this.childAC.temp = null;
        // this.childAC.changeSubscription.unsubscribe();
        this.childAC._AutoCompleteSubscription()
        // if (this.child?.list?.length == 1)
        //   this.child?.control?.patchValue(this.child?.list[0]?.id);
        // let hasCurrentValue = false;
        // this.child.list.forEach((childlist) => {
        //   if (childlist?.id == this.child?.control?.value) {
        //     hasCurrentValue = true;
        //   }
        // });
        // if (!hasCurrentValue) this.setChildEmpty(this.child);
        // if (hasCurrentValue)
        //   this.child?.control?.patchValue(this.child?.control?.value);
      } else {
        this.setChildEmpty(this.child);
      }
    }
  }

}
