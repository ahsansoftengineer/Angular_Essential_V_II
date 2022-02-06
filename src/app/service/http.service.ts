import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { URLz } from '../enums/url.enum';
import { ServerMultipleResponseDropDown } from '../interface/common/select';
import { ServerMultipleResponse } from '../interface/common/server-multiple-response';
import { ServerSingleResponse } from '../interface/common/server-single-response';
import { HttpServiceParam } from '../interface/common/http-service-param';

@Injectable({
  providedIn: 'root',
})
/**
  BASE HTTP SERVICE
  #1 Top Level Service
  0. Cannot be Extended
  1. Must have url with Set to Global URL
    a. This Service can only be depend on Angular Dependencies
    b. This Service Cannot Depend on Low Level Service Dependencies
      (e.g Validator, Form Service)
    c. Otherwise it could cause Circular Dependency
  2. Must Inject httpClient Module
  4. Must have following (CRUD) Methods (gets, get, create, update, delete, modify)
  5. All CRUD Methods must expect HttpServiceParam Interface
  6. All getter Observable Methods Return Type Must be
    a. ServerSingleResponse
    b. ServerMultipleResponse
    c. ServerMultipleResponseDropDown
  7. All Supported Methods must be private

*/
export class HTTPService {
  private readonly url: string = environment.API_URL;
  readonly defaultParam: string = '';
  readonly http: HttpClient;
  // Marking Private Because Typescript does not support
  // sealed and final key word
  private constructor(injector: Injector) {
    console.log('HTTP SERVICE CALLLED');

    this.http = injector.get(HttpClient);
  }
  get(param: Partial<HttpServiceParam>): Observable<ServerSingleResponse> {
    param = this.mergeParam(param);
    return this.http
      .get<ServerSingleResponse>(this.urlResult(param))
      .pipe(catchError((error, response) => {
        return this.handleError(error, response, param)
      }));
  }
  gets(param: Partial<HttpServiceParam>): Observable<ServerMultipleResponse> {
    param = this.mergeParam(param);
    return this.http
      .get<ServerMultipleResponse>(this.urlResult(param))
      .pipe(catchError((error, response) => {
        return this.handleError(error, response, param)
      }));
  }
  create(param: Partial<HttpServiceParam>): Observable<any> {
    param = this.mergeParam(param);
    return this.http
      .post(this.urlResult(param), param.body)
      .pipe(catchError((error, response) => {
        return this.handleError(error, response, param)
      }));
  }
  update(param: Partial<HttpServiceParam>): Observable<any> {
    if (param.param)
      param.param += '&_method=PUT';
    else param.param = '&_method=PUT';
    param = this.mergeParam(param);
    return this.http
      .post(this.urlResult(param), param.body)
      .pipe(catchError((error, response) => {
        return this.handleError(error, response, param)
      }));
  }
  delete(param: Partial<HttpServiceParam>): Observable<any> {
    param.param += '&_method=DELETE';
    param = this.mergeParam(param);
    return this.http
      .post(this.urlResult(param), param.body)
      .pipe(catchError((error, response) => {
        return this.handleError(error, response, param)
      }));

  }
  // Only For Transaction
  modify(param: Partial<HttpServiceParam>): Observable<any> {
    param = this.mergeParam(param);
    return this.http
      .patch(this.urlResult(param), param.body)
      .pipe(catchError((error, response) => {
        return this.handleError(error, response, param)
      }));

  }
  status(param: Partial<HttpServiceParam>) {
    param.param += '&_method=PATCH';
    param = this.mergeParam(param);
    return this.http
      .post(this.urlResult(param), param.body)
      .pipe(catchError((error, response) => {
        return this.handleError(error, response, param)
      }));

  }
  org_id = '';
  sys_id = '';
  selectOptionService(
    param: Partial<HttpServiceParam>
  ): Observable<ServerMultipleResponseDropDown> {
    param = { ...this.defaultParametersSelect, ...param }
    return this.http
      .get<ServerMultipleResponseDropDown>(this.urlResult(param))
      .pipe(catchError((error, response) => {
        return this.handleError(error, response, param)
      }));

  }
  private mergeParam(providedParameters: HttpServiceParam) {
    return { ...this.defaultParameters, ...providedParameters };
  }
  private urlResult(param: Partial<HttpServiceParam>) {
    let result = '';
    if (param.endpoint == URLz.DEFAULT) result = param.url;
    if (param.endpoint != URLz.DEFAULT) result = param.url + param.endpoint;
    if (param?.resource) result += '/' + param.resource;
    if (param?.param) this.urlQueryToObject(param);
    if (param.paramObj != null)
      result += '?' + this.objToURLQuery(param);
    return result;
  }
  private urlQueryToObject(param: Partial<HttpServiceParam>) {
    if(param.param){
      try{
        let newParamObject =
        JSON.parse('{"' +
          decodeURI(param.param)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g,'":"') +
          '"}')
        param.paramObj = {
          ...newParamObject,
          ...param.paramObj
        }
      } catch(erro){
        console.error('Invalid Parameters ->' + param.param)
      }

    }
  }
  private objToURLQuery(param: Partial<HttpServiceParam>) {
    // For Simple Object Only
    let result = '';
    let obj = param.paramObj
    Object.keys(obj).forEach(key => {
      if (
        obj[key] != null &&
        obj[key] != '' &&
        obj[key] != undefined) {
          result += '&' + key + '=' + obj[key];
        }
    })
    if(result)
      result = result.substring(1, result.length)
    return result
  }
  private get defaultParametersSelect(): HttpServiceParam {
    if (this.org_id && this.sys_id)
      return {
        url: this.url,
        paramObj: {
          organisation_id: this.org_id,
          system_id: this.sys_id
        }
      };
    if (this.org_id)
      return {
        url: this.url,
        paramObj: {
          organisation_id: this.org_id,
        }
      };
    return { url: this.url }
  }
  private handleError(
    error: HttpErrorResponse,
    response: Observable<any>,
    param: Partial<HttpServiceParam>
  ): Observable<never> {
    console.group(param.endpoint)
    console.error(param)
    console.error(error);
    console.groupEnd()
    return throwError(error);
  }
  get defaultParameters(): HttpServiceParam {
    return {
      param: this.defaultParam,
      url: this.url,
    };
  }
}
