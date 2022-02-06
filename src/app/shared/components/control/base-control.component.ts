import {
  Component,
  HostBinding,
  Injector,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { BaseServiceInjector } from 'src/app/class/base-service-injector';
import { HttpServiceParam } from 'src/app/interface/common/http-service-param';
import { Custom } from 'src/app/static/custom';
@Component({
  selector: 'di-base-control',
  template: '',
})
//Dropdown
export class BaseControlComponent extends BaseServiceInjector  implements OnInit, OnChanges {
  // Service Injection
  // Local Properties
  control: FormControl;
  defaultParam: HttpServiceParam = {}
  errMsg: string;
  // Properties provided by Parent
  @Input() field: string = '';
  @Input() lbl: string = 'Provide Label';
  @Input() req: boolean = true;
  @Input() group: FormGroup;
  @Input() groupName;
  @Input() disabled: boolean = false;
  @Input() hide: boolean = false;
  @Input() param: HttpServiceParam = {};

  // Parent Child Group Properties
  childFC: FormControl;
  parentFC: FormControl;
  @Input() parentFCName: string; // Form Control
  @Input() parentGrpName: string; // Merge with ParentGrp
  @Input() parentGrp: FormGroup; // Merge with ParentGrpName

  subscriptions: Subscription[] = []
  @HostBinding('class.hideControl') hideControl: boolean = false;

  constructor(injector: Injector) {
    super(injector)
  }
  ngOnInit(): void {
    this.set_Control(
      this.group,
      this.groupName,
      CONTROLTYPE.SELF
    )
    this.setParentSubscription();
    // this.statusChangesSubscription()
  }
  // For Setting (Self, Parent & Child) Controls
  set_Control(
    group: FormGroup,
    groupName: string,
    CT: CONTROLTYPE){
    if (groupName) {
      group = this._fs._form.get(this.groupName) as FormGroup;
    } else if (!group && !groupName && !this.group) {
      group = this._fs._form as FormGroup;
    } else if (!group && !groupName && this.group) {
      group = this.group
    }

    if (group && CT == CONTROLTYPE.SELF) {
      this.control = group?.get(this.field) as FormControl;
    }
    if (group && CT == CONTROLTYPE.PARENT) {
      this.parentFC = group.get(this.parentFCName) as FormControl;

    }
  }
  setParentSubscription(){
    if(this.parentFCName){
      if(!this.parentGrpName && this.groupName){
        this.parentGrpName = this.groupName
      } else if(!this.parentGrp && this.group){
        this.parentGrp = this.group
      }
      this.set_Control(
        this.parentGrp,
        this.parentGrpName,
        CONTROLTYPE.PARENT
      )
    }
  }
  _stop(event){
    event.stopPropagation()
  }
  emptyCheck(val: any){
    return Custom.emptyCheck(val)
  }
  mergeParam(providedParameters: HttpServiceParam = this.param) {
    return { ...this.defaultParam, ...providedParameters };
  }
  // # FIXES Sort Out Later
  // Functions are being called on every event of Application
  // So we have to set messages via using properties using below code
  // or by using pipe
  statusChangesSubscription(){
    if(this.control)
    this.control.statusChanges.subscribe(x => {
      this.errMsg = this._vs._error_control(this.control)?.message
    })
  }
  controlBlur(){
    this.errMsg = this._vs._error_control(this.control)?.message
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      x?.unsubscribe()
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    // Sort Out Later
    // if(!changes?.firstchange && changes?.hide?.currentValue){
    //   this.hideControl = this.hide
    // }
  }
}
enum CONTROLTYPE {
  SELF = 'SELF',
  CHILD = 'CHILD',
  PARENT = 'PARENT'
}
