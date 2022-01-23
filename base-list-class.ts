import { Component, Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { DI_Table, DI_Tables } from '../interface/common/di-table';
import { HttpServiceParam } from '../interface/common/http-service-param';
import { ImgViewComponent } from '../shared/components/dialogs/img-view/img-view.component';
import { Custom } from '../static/custom';
import { BaseServiceInjector } from './base-service-injector';

@Component({
  template: '',
})
// In Base Class append all the properties / methods with _ (underscore)
export abstract class BaseListClass extends BaseServiceInjector {
  constructor(injector: Injector) {
    super(injector);
    this.resetProperties();
  }
  _activeGuard = false;
  // Components Properties
  _component: string = 'Override _component property in Component ngOnInit';
  _pathLocation: string;
  // Table Properties
  _tbls: DI_Tables = {};
  _tblsArray: any;
  _reset(tableName: string) {
    this._tbls[tableName] = {
      param: '',
      dataSource: new MatTableDataSource([]),
      search: {}, // not in use old
      length: 0,
      index: 0,
      prevIndex: 0,
      size: 10,
      sizes: [5, 10, 20],
      orderBy: '',
      orderType: '',
      // This Properties needs to be set as per Old Values
      tableName,
      columns: this._tbls[tableName]?.columns,
      url: this._tbls[tableName]?.url,
      endpoint: this._tbls[tableName]?.endpoint,
      form: this._tbls[tableName]?.form,
      formBody: this._tbls[tableName]?.formBody,
    };
    if (this._tbls[tableName]?.form)
      this._tbls[tableName].form.reset();
    if (this._tbls[tableName]?.formBody)
      this._tbls[tableName].formBody.reset();
  }
  _sort(sort: Sort, tableName: string, callAPI = this.callAPI) {
    this._tbls[tableName].orderBy = sort.active;
    this._tbls[tableName].orderType = sort.direction;
    this._refresh(tableName, '', callAPI);
  }
  _paginate(event?: PageEvent, tableName?: string, callAPI = this.callAPI): PageEvent {
    this._tbls[tableName].index = event.pageIndex;
    this._tbls[tableName].length = event.length;
    this._tbls[tableName].size = event.pageSize;
    this._tbls[tableName].prevIndex = event.previousPageIndex;
    this._refresh(tableName, '', callAPI);
    return event;
  }
  // Search Functionality
  _refresh(tableName: string, param = '', callAPI = this.callAPI) {
    if (!this.emptyCheck(this._tbls[tableName]?.url))
      this._tbls[tableName].url = environment.API_URL;
    let parma: HttpServiceParam = {
      url: this._tbls[tableName].url,
      endpoint: this._tbls[tableName].endpoint,
      paramObj: {
        ...this._tbls[tableName]?.form?.value,
        limit: this._tbls[tableName].size,
        page: this._tbls[tableName].index + 1,
        order_by: this._tbls[tableName].orderBy,
        order_type: this._tbls[tableName].orderType,
      },
      param:  this._tbls[tableName]?.param + param
    }
    callAPI(tableName, parma)
  }
  callAPI = (tableName: string, param: HttpServiceParam) => {
    this._http
    .gets(param).subscribe((res) => {
      this._tbls[tableName].dataSource.data = res?.data?.records;
      this._tbls[tableName].length = res?.data?.totalRecords;
    });
  }
  _formCreator(tbl: DI_Table) {
    tbl.form = this._fb.group({});
    tbl.columns.forEach((control) => {
      tbl.form.addControl(control, new FormControl(''));
    });
  }
  // Turn in it into Object of keys
  iterateTables(callBackFunction) {
    this._tblsArray.forEach((tbl) => {
      callBackFunction(tbl);
    });
    // Object.keys(this._tbls).forEach((key: string) => {
    //   callBackFunction(this._tbls[key])
    // })
  }
  _stop(event) {
    event.stopPropagation();
  }
  _status: any = {
    id: '',
    activate: '',
  };
  _switch(id = undefined) {
    if (id) this._router.navigate([this._pathLocation, { id: id }]);
    else this._router.navigate([this._pathLocation]);
  }
  _delete(id: number) {
    Custom.SwalFireDelete(this._service, this._component, id);
  }
  _statusChange(value: boolean, id: number) {
    this._status.activate = +value;
    this._status.id = id;
    Custom.SwalFireStatusChange(this._service, this._status, this._component);
  }
  // NEW
  _statusChanged(value: boolean, id: number) {
    this._status.activate = +value;
    this._status.id = id;
    Custom.SwalFireStatusChange(this._service, this._status, this._component);
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
  openImage(data, title) {
    let config: MatDialogConfig = {
      panelClass: 'dialog-responsive',
      data: { source: data, title: title },
    };
    const dialogRef = this._dialog.open(ImgViewComponent, config);
    dialogRef.afterClosed().subscribe((result) => { });
  }
}
