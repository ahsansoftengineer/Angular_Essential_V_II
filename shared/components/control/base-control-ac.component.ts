import { Component, Injector, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, catchError } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { SelectOption } from 'src/app/interface/common/select';
import { BaseControlBridgeComponent } from './base-control-duplicate.component';

@Component({
  selector: 'di-base-control-ac',
  template: '',
})
//Dropdown
export class BaseControlACComponent extends BaseControlBridgeComponent implements OnInit, OnChanges {
  @Input() length = 3
  // Local Properties
  searchControl: FormControl = new FormControl()
  temp: Observable<any>;
  totalRecords: number;
  showCopiedRecord = true
  // Specific Fields of Childs
  fromACArray = false;
  fromACDep = false;
  ACDepcurrentValue = '';
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    super.ngOnInit();
    if (this.load) {
      this._AutoCompleteSubscription()
    }
    if(this.url)
    this.defaultParam.paramObj = {
      page: 1,
      limit: 200,
    }
  }
  _AutoCompleteSubscription() {
    this.temp = this.searchControl.valueChanges.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      filter((val) => val?.length > this.length),
      // Stop mean while new request arrives
      switchMap((val) => {
        let filteredRecord: SelectOption[];
        // Here needs working for Special Character to use
        let str = val.replace(/[^A-Za-z0-9(),-_.,]/ig, " ")
        var regex = new RegExp(`/*${str}/*`, 'ig');
        if (this.list?.length > 0) {
          filteredRecord = this.list.filter(
            (res) => res.title.search(regex) != -1
          );
        }
        if (this.fromACArray) {
          this.showCopiedRecord = false
          this.control.patchValue(null)
        }
        // Continue
        if (filteredRecord?.length > 0) {
          return of(filteredRecord);
        } else {
        //#region
          // Shifted to HTTP Param Implementation
          this.param.paramObj = {
            ...this.defaultParam.paramObj,
            ...this.param.paramObj,
            title: val,
            organisation_id: this._http.org_id,
            system_id: this._http.sys_id,
          }
          if (this.parentDD)
            this.defaultParam.paramObj[this.parentKey] = this.parentDD?.control?.value
          if (this.parentAC)
            this.defaultParam.paramObj[this.parentKey] = this.parentAC?.control?.value
          this.param.paramObj = { ...this.defaultParam.paramObj,  ...this.param.paramObj}
          //#endregion
          return this._http.gets({...this.mergeParam()}).pipe(
            catchError((err) => {
              console.log(err);
              return []
            }),
            map(
              (res) => {
              this.totalRecords = res.data.totalRecords;
              this.list = res.data.records
              // .filter(
              //   (res) => res.title.search(regex) != -1
              // );
              return this.list;
            }),

          );
        }
      })
    );
  }
  // If anything goes wrong then add DoCheck
  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes)
  }
}
