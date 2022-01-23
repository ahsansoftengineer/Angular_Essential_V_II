import { HttpErrorResponse } from '@angular/common/http';
import { Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpServiceParam } from '../interface/common/http-service-param';
import { BaseServiceInjector } from './base-service-injector';
// In Base Class append all the properties / methods with _ (underscore)
export abstract class BaseForm extends BaseServiceInjector {
  // Services Injection
  __ddl: any = {};
  constructor(public injector: Injector) {
    super(injector);
    this.resetProperties();
  }
  _onSubmit(sp: SubmitParam = this.defaultBehaviour) {
    sp = this.mergeSubmitParam(sp)
    sp.before(sp);
    sp.merageParam(sp);
    if (!sp.validate(sp)) return false;
    sp.body(sp);
    if (sp.modifyCondition(sp)) sp.modify = sp.update(sp)
    else sp.modify = sp.create(sp)
    sp.httpCall(sp)
  }
  beforeSubmit = (sp: SubmitParam): void => {
    this._fs._form.markAllAsTouched();
    this._vs._submitted = true;
    this._vs.logForm();
  }
  validate = (sp: SubmitParam): boolean => {
    return this._fs._form.valid
  }
  modifyCondition = (sp: SubmitParam): boolean => {
    return this.emptyCheck(this._activeId)
  }
  setBody = (sp: SubmitParam) => {
    sp.param.body = this._fs._form.value;
  }
  update = (sp: SubmitParam): Observable<Object> => {
    // this._fs._form.addControl(idz, new FormControl(this._activeId));
    sp.param.param = 'id=' + this._activeId;
    return this._http.update(sp.param);
  }
  create = (sp: SubmitParam): Observable<Object> => {
    return this._http.create(sp.param);
  }
  httpCall = (sp: SubmitParam) => {
    sp.modify.subscribe({
      next: (res) => sp.next(sp, res) ,
      error: (errorz) => { sp.error(errorz) },
      complete: () => sp.complete(sp)
    });
  }
  httpNextHandler = (sp: SubmitParam, res: any) => {
    Swal.fire({
      title: this._activeId ? 'Updated' : 'Created',
      text: res.message,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: '<i class="fas fa-thumbs-up"></i>',
    }).then((res) => {
      sp.swalAction(sp, res)
    });
  }
  httpErrorHandler = (httpErrorResponse: HttpErrorResponse) => {
    this._vs._error_server(httpErrorResponse.error);
  }
  httpCompleteHandler = () => {

  }
  swalAction = (sp: SubmitParam, res) => {
    this._fs._form.reset();
    this._fhs._switch();
  }
  mergeSubmitParam(submitParam: SubmitParam){
    return {...this.defaultBehaviour, ...submitParam}
  }
  defaultBehaviour: SubmitParam = {
    param: this.param, //: HttpServiceParam
    before: this.beforeSubmit,
    merageParam: this.mergeParam,
    validate: this.validate,
    body: this.setBody,
    modifyCondition: this.modifyCondition,
    update: this.update,
    create: this.create,
    httpCall: this.httpCall,
    next: this.httpNextHandler,
    error: this.httpErrorHandler,
    complete: this.httpCompleteHandler,
    swalAction: this.swalAction
  }
}
export interface SubmitParam {
  param?: HttpServiceParam;
  before?: Function;
  merageParam?: Function;
  validate?: Function;
  modifyCondition?: Function;
  body: Function;
  update?: Function;
  create?: Function;
  httpCall?: Function;
  modify?: Observable<any>
  next?: Function;
  error?: Function;
  complete?: Function;
  swalAction?: Function;
}

