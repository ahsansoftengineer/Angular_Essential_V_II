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
import { BaseServiceInjector } from 'src/app/class/base-service-injector';
import { HttpServiceParam } from 'src/app/interface/common/http-service-param';
import { Custom } from 'src/app/static/custom';
@Component({
  selector: 'my-base-control',
  template: '',
})
//Dropdown
export class BaseControlComponent extends BaseServiceInjector  implements OnInit, OnChanges {
  // Service Injection
  // Local Properties
  control: FormControl;
  defaultParam: HttpServiceParam = {} // work with this.defaultParam

  // Properties provided by Parent
  @Input() field: string = ''; // Merge with this.control Next Version
  @Input() lbl: string = 'Provide Label';
  @Input() req: boolean = true;
  @Input() group: FormGroup;
  @Input() groupName; // Merge with this.group Next Version
  @Input() disabled: boolean = false;
  @Input() hide: boolean = false;
  @Input() param: HttpServiceParam = {}; // work with this.defaultParam

  // Parent Child Group Properties
  childFC: FormControl;
  parentFC: FormControl;
  @Input() parentFCName: string; // Form Control
  @Input() parentGrpName: string; // Remove this property in Next Version
  @Input() parentGrp: FormGroup; // For Array Purpose


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
    this.set_Control(
      this.parentGrp,
      this.parentGrpName,
      CONTROLTYPE.PARENT
    )

    // Sort Out Later
    // this.hideControl = this.hide
    // this.resetControl();

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

  emptyCheck(val: any){
    return Custom.emptyCheck(val)
  }
  // Used for DD / AC Controls
  mergeParam(providedParameters: HttpServiceParam = this.param) {
    return { ...this.defaultParam, ...providedParameters };
  }
  // Table Related
  _stop(event){
    event.stopPropagation()
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
