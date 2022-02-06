import { HttpErrorResponse } from '@angular/common/http';
import { Injector } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpServiceParam } from '../interface/common/http-service-param';
import { PartialSubmit } from '../interface/common/partial-submit';
import { Custom } from '../static/custom';
import { BaseServiceInjector } from './base-service-injector';
export abstract class BaseForm extends BaseServiceInjector {
  // Services Injection
  __ddl: any = {};
  __component_Name : string;
  constructor(public injector: Injector) {
    super(injector);
    this.resetProperties();
  }
  /**
   * @deprecated USE _onSubmity(param: HttpServiceParam) Instead
   */
  _onSubmit(param = '', id = 'id') {
    this.param.param += param;
    return this._onSubmity({param: this.param, id})
  }

  _onSubmitx(
    param: HttpServiceParam = this.param,
    id = 'id'
  ) {
    return this._onSubmity({param, id})
  }
  // HTTPService (CREATE UPDATE)
  // # SOLID (Open-closed Principle)
  // Objects or entities should be open for extension, but closed for modification.
  /**
     * @see {@link PartialSubmit}
     * @param {param} HttpServiceParam @see {@link HttpServiceParam}
     * @returns boolean | void
   */
  _onSubmity(ps: PartialSubmit = this.defaultBehaviour): boolean | void {
    ps = this.mergeSubmitParam(ps)
    ps.before(ps);
    ps.mergeHTTPParam(ps);
    if (!ps.validate(ps)) return false;
    ps.body(ps);
    ps.confirmation(ps);
  }
  beforeSubmit = (ps: PartialSubmit): void => {
    this._fs._form.markAllAsTouched();
    this._vs._submitted = true;
    this._vs.logForm();
  }
  validate = (ps: PartialSubmit): boolean => {
    return this._fs._form.valid || true
  }
  confirmationMessage = (ps: PartialSubmit) => {
    Swal.fire({
        ...Custom.mergeSwalFire({
          title: 'Confirm ' + (this._activeId ? 'Edit' : 'Save'),
          text: 'Are you sure the information is correct? '
        })
      }).then(result => {
        if (result.isConfirmed) {
          ps.confirmationAction(ps)
        } else {
          ps.confirmationDeny(ps)
        }
    });
  }
  confirmationAction = (ps: PartialSubmit) => {
    ps.modifyCondition(ps) ? ps.modify = ps.update(ps) : ps.modify = ps.create(ps)
    ps.httpCall(ps)
  }
  confirmationDeny = (ps: PartialSubmit) => {

  }
  modifyCondition = (ps: PartialSubmit): boolean => {
    return this.emptyCheck(this._activeId)
  }
  setBody = (ps: PartialSubmit) => {
    ps.param.body = this._fs._form.value;
  }
  update = (ps: PartialSubmit): Observable<Object> => {
    this._fs._form.addControl(ps.id, new FormControl(this._activeId));
    ps.param.param = 'id=' + this._activeId;
    return this._http.update(ps.param);
  }
  create = (ps: PartialSubmit): Observable<Object> => {
    return this._http.create(ps.param);
  }
  httpCall = (ps: PartialSubmit) => {
    ps.modify.subscribe({
      next: (res) =>{ ps.next(ps, res)},
      error: (errorz: HttpErrorResponse) => {
        ps.error(ps, errorz)
      },
      complete: () => ps.complete(ps)
    });
  }
  httpNextHandler = (ps: PartialSubmit, res: any) => {
    Swal.fire({
      title: this._activeId ? 'Updated' : 'Created',
      text: res.message,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: '<i class="fas fa-thumbs-up"></i>',
    }).then((res) => {
      ps.httpResultAction(ps, res)
    });
  }
  httpErrorHandler = (
    ps: PartialSubmit,
    httpErrorResponse: HttpErrorResponse
  ) => {
    this._vs._error_server(httpErrorResponse);
  }
  httpCompleteHandler = () => {

  }
  swalAction = (ps: PartialSubmit, res) => {
    this._fs._form.reset();
    this._fhs._switch();
  }
  mergeSubmitParam = (ps: PartialSubmit) => {
    return {...this.defaultBehaviour, ...ps}
  }
  mergeHTTPParamForm = (ps: PartialSubmit) => {
    ps.param = this.mergeParam(ps.param);
  }
  defaultBehaviour: PartialSubmit = {
    param: this.param, //: HttpServiceParam
    before: this.beforeSubmit,
    mergeHTTPParam: this.mergeHTTPParamForm,
    validate: this.validate,
    body: this.setBody,
    confirmation: this.confirmationMessage,
    confirmationAction: this.confirmationAction,
    confirmationDeny: this.confirmationDeny,
    modifyCondition: this.modifyCondition,
    update: this.update,
    create: this.create,
    httpCall: this.httpCall,
    next: this.httpNextHandler,
    error: this.httpErrorHandler,
    complete: this.httpCompleteHandler,
    httpResultAction: this.swalAction,
    id:'id'
  }
}


