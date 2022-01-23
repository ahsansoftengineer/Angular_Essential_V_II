import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Custom } from '../static/custom';
import { environment } from '../../environments/environment';
import { URLz } from '../enums/url.enum';
import { SelectOption } from '../interface/common/select';
import { ServerMultipleResponse } from '../interface/common/server-multiple-response';
import { ServerSingleResponse } from '../interface/common/server-single-response';
import { HttpServiceParam } from '../interface/common/http-service-param';

@Injectable({
  providedIn: 'root',
})
/**
  BASE HTTP SERVICE
  1. Must have url with Set to Global URL
  2. Must have endpoint
  3. Must Inject httpClient Module
  4. Must have following (CRUD) Methods (gets, get, create, update, delete, modify)
  5. All CRUD Methods must expect HttpServiceParam Interface
  6. Must has SelectOption individually Generic
  7. Must have following Helper Methods (urlResult, objToURLQuery, mergeParam, defaultParameters)

*/
export class HTTPService {
  private url: string = environment.API_URL;
  defaultParam: string = '';
  http: HttpClient;
  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
  }
  get(param: Partial<HttpServiceParam>): Observable<ServerSingleResponse> {
    param = this.mergeParam(param);
    return this.http.get<ServerSingleResponse>(this.urlResult(param));
  }
  gets(param: Partial<HttpServiceParam>): Observable<ServerMultipleResponse> {
    param = this.mergeParam(param);
    return this.http.get<ServerMultipleResponse>(this.urlResult(param));
  }
  create(param: Partial<HttpServiceParam>) {
    param = this.mergeParam(param);
    return this.http
      .post(this.urlResult(param), param.body)
      .pipe(catchError(Custom.handleError));
  }
  update(param: Partial<HttpServiceParam>) {
    if(param.param)
      param.param += '&_method=PUT';
    else param.param = '&_method=PUT';
    param = this.mergeParam(param);
    return this.http
      .post(this.urlResult(param), param.body)
      .pipe(catchError(Custom.handleError));
  }
  delete(param: Partial<HttpServiceParam>) {
    param.param += '&_method=DELETE';
    param = this.mergeParam(param);
    return this.http.post(this.urlResult(param), param.body);
  }
  // Only For Transaction
  modify(param: Partial<HttpServiceParam>) {
    param = this.mergeParam(param);
    return this.http.patch(this.urlResult(param), param.body);
  }
  status(param: Partial<HttpServiceParam>) {
    param.param += '&_method=PATCH';
    param = this.mergeParam(param);
    return this.http.post(this.urlResult(param), param.body);
  }
  org_id = '';
  sys_id = '';
  selectOptionService(
    param: Partial<HttpServiceParam>
  ): Observable<any> {
    param = {...this.defaultParametersSelect, ...param}
     return this.http.get<SelectOption[]>(
      this.urlResult(param)
    );
  }
  saveUserLocalStorage(): Observable<ServerSingleResponse> {
    return this.http.get<any>(environment.API_URL + URLz.USER_PERMISSION);
  }
  urlResult(param: Partial<HttpServiceParam>) {
    let result = '';
    if (param.endpoint == URLz.DEFAULT) result = param.url;
    if (param.endpoint != URLz.DEFAULT) result = param.url + param.endpoint;
    if (param?.resource) result += '/' + param.resource;
    if (param?.param) result += '?' + param.param;
    if (!param?.param && param.paramObj != null)
      result += '?' + this.objToURLQuery(param.paramObj);
    if (param?.param != '' && param.paramObj != null)
      result += this.objToURLQuery(param.paramObj);
    return result;
  }
  objToURLQuery(searchObject: any) {
    // For Simple Object Only
    let result = '';
    for (var key of Object.keys(searchObject)) {
      if (
          searchObject[key] != null &&
          searchObject[key] != '' &&
          searchObject[key] != undefined) {
            result += '&' + key + '=' + searchObject[key];
      }
    }
    return result;
  }
  mergeParam(providedParameters: HttpServiceParam) {
    // for (var key of Object.keys(providedParameters)) {
    //   if (providedParameters[key] == null ||
    //       providedParameters[key] == '' ||
    //       providedParameters[key] == undefined
    //   ){
    //     delete providedParameters[key]
    //   }
    // }
    return { ...this.defaultParameters, ...providedParameters };
  }
  get defaultParametersSelect(): HttpServiceParam {

    if(this.org_id && this.sys_id){
      return {
        url: this.url,
        paramObj: {
          organisation_id: this.org_id,
          system_id: this.sys_id
        }
      };
    } else if(this.org_id){
      return {
        url: this.url,
        paramObj: {
          organisation_id: this.org_id,
        }
      };
    }else {
      return {
        url: this.url
      };
    }

  }
  get defaultParameters(): HttpServiceParam {
    return {
      param: this.defaultParam,
      url: this.url,
    };
  }
}
