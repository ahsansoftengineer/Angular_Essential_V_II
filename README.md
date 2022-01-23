# Angular_Essential_V_II
## Angular Component Based Approach
#### All the Base Classes used within Angular App
1. Extending Base Injector Class
2. _onSubmit() is responsible for any type of CREATE and UPDATE HTTP request.
> * CREAT / UPDATE using Form Data.
> * CREAT / UPDATE using JSON Object.
> * Call Back Methods can be override as per the requirement
3.  Partial _onSubmit() Method
```javascript
  _onSubmit(ps: PartialSubmit = this.defaultBehaviour) {
    ps = this.mergePartialSubmit(ps)
    ps.before(ps);
    ps.merageParam(ps);
    if (!ps.validate(ps)) return false;
    ps.body(ps);
    if (ps.modifyCondition(ps)) ps.modify = ps.update(ps)
    else ps.modify = ps.create(ps)
    ps.httpCall(ps)
  }
```
4. Setting Default Behaviour of Partial _onSubmit() Method 
```javascript
 defaultBehaviour: PartialSubmit = {
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
```

5. Partial Methods Implementation
```javascript
  beforeSubmit = (ps: PartialSubmit): void => {
    this._fs._form.markAllAsTouched();
    this._vs._submitted = true;
    this._vs.logForm();
  }
  validate = (ps: PartialSubmit): boolean => {
    return this._fs._form.valid
  }
  modifyCondition = (ps: PartialSubmit): boolean => {
    return this.emptyCheck(this._activeId)
  }
  setBody = (ps: PartialSubmit) => {
    ps.param.body = this._fs._form.value;
  }
  update = (ps: PartialSubmit): Observable<Object> => {
    // this._fs._form.addControl(idz, new FormControl(this._activeId));
    ps.param.param = 'id=' + this._activeId;
    return this._http.update(ps.param);
  }
  create = (ps: PartialSubmit): Observable<Object> => {
    return this._http.create(ps.param);
  }
  httpCall = (ps: PartialSubmit) => {
    ps.modify.subscribe({
      next: (res) => ps.next(ps, res) ,
      error: (errorz) => { ps.error(errorz) },
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
      ps.swalAction(ps, res)
    });
  }
  httpErrorHandler = (httpErrorRepsonse: HttpErrorRepsonse) => {
    this._vs._error_server(httpErrorRepsonse.error);
  }
  httpCompleteHandler = () => {

  }
  swalAction = (ps: PartialSubmit, res) => {
    this._fs._form.reset();
    this._fhs._switch();
  }
  mergePartialSubmit(PartialSubmit: PartialSubmit){
    return {...this.defaultBehaviour, ...PartialSubmit}
  }
```

```javascript
export interface PartialSubmit {
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
```