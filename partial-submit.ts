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
