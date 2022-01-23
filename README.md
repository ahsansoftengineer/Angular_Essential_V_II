# Angular_Essential_V_II
## Angular Component Based Approach
#### All the Base Classes used within Angular App
1. Extending Base Injector Class
2. _onSubmit() is responsible for any type of CREATE and update HTTP request.
> * CREAT / UPDATE using Form Data.
> * CREAT / UPDATE using JSON Object.
> * Call Back Methods can be override as per the requirement
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