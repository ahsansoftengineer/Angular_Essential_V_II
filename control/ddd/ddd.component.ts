import { Component, Injector, Input, OnInit } from '@angular/core';
import { BaseControlACComponent } from '../base-control-ac.component';
import { BaseControlDDComponent } from '../base-control-dd.component';

@Component({
  selector: 'my-ddd',
  templateUrl: './ddd.component.html',
  styleUrls: ['./ddd.component.css'],
  host: { class: 'col-lg-3 col-md-4 p-0' },
})
// Drop Down Dependent
export class DddComponent extends BaseControlDDComponent implements OnInit {
  @Input('parent') parent: DddComponent;
  @Input('parentAC') parentAC: BaseControlACComponent;
  @Input('oneTimeLoad') oneTimeLoad: boolean;
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    super.ngOnInit();
    if (this.oneTimeLoad) this.onceLoad();
    if(this.parent) this.childLoadingDataByParent();
  }
  childLoadingDataByParent(){
    // For DD Parent
    if (this?.parent && this.parent?.control && this?.prelist?.length < 1 && !this.preobj) {
      if (this.parent?.control?.value != null && this.parent.control.value != '')
          this.loadData(this.parent.control.value);
    }
    // For AC Parent
    if (this?.parentAC && this?.prelist?.length < 1 && !this.preobj) {
      if (this.parentAC?.control?.value != null && this?.parentAC?.control.value != '')
        if(this.parentKey){
          console.log('parentKey exsist');
          this.loadData(this.parentAC.ACDepcurrentValue);
        }
        else
          this.loadData(this.parentAC.control.value);

    }
  }
  onceLoad() {
    if (!this._css._ddOneTimeLoad[this.field] && this._css.loading.indexOf(this.field) == -1) {
      this._css.loading.push(this.field)
        this._http.selectOptionService({endpoint: this.url}).subscribe((res) => {
          this.list = res.data.records;
          this._css._ddOneTimeLoad[this.field] = res.data.records
          if (this.list?.length === 1) {
            this.control.patchValue(this.list[0].id);
          }
        });
    } else {
      this.list = this._css._ddOneTimeLoad[this.field];
    }
  }
}
