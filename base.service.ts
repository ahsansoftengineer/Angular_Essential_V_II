import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Custom } from 'src/app/static/custom';
import { environment } from 'src/environments/environment';
import { URLz } from '../enums/url.enum';
import { SelectOption } from '../interface/common/select';
import { ServerMultipleResponse } from '../interface/common/server-multiple-response';
import { ServerSingleResponse } from '../interface/common/server-single-response';

@Injectable({
  providedIn: 'root',
})
// Base Service Must be Generic
// Must have url
// Must Inject HttpClient
// Must has Methods getAll, getSingle, create, update, delete,
// Must has SelectOption individually Generic
/**
 * @deprecated after HTTPService use HTTPService
*/
export class BaseService{
  public url: string;
  public http: HttpClient;

  constructor(injector: Injector) {
    this.http = injector.get(HttpClient);
    //
  }
  getAll(param: string = '' ,  url : string = this.url): Observable<ServerMultipleResponse> {
      param = param !== '' ? '?' + param: ''
      return this.http.get<ServerMultipleResponse>(url + param);
  }
  getSingle(id: any = '', param: string = '', url = this.url): Observable<ServerSingleResponse> {
    param = param !== '' ? '?' + param: ''
    if(url.includes('acknowledgement')){
      return this.http.get<ServerSingleResponse>(url + id + param);
    }
    else{
      return this.http.get<ServerSingleResponse>(url + '/' + id + param);
    }
  }
  getByCode(id: string, url = this.url): Observable<ServerSingleResponse> {
    return this.http.get<ServerSingleResponse>(url + '/' + id);
  }
  getSingleSearch(param: string, endpoint: string = ''){
    param = param !== '' ? '?' + param : ''
    return this.http.get<any>(environment.API_URL + endpoint + param);

  }
  create(data: any, param: string = '', url = this.url) {
    console.log(url);
    
    param = param !== '' ? '?' + param: ''
    return this.http.post(url + param, data)
      .pipe(catchError(Custom.handleError));
  }
  update(data: any, param: string = '', url = this.url) {
    return this.http.post(url + '?_method=PUT' + param, data)
    .pipe(catchError(Custom.handleError));
  }
  delete(id: number, param: string = '',url = this.url) {
    return this.http.post(url + '/' + id + '?_method=DELETE' + param, id);
  }
  // Only For Transaction
  cancel(param: string = '',body: any = null, url = this.url) {
    param = param !== '' ? '?' + param: '';
    return this.http.patch(url + param, body);
  }
  getSpecific(): Observable<ServerSingleResponse> {
    return this.http.get<ServerSingleResponse>(this.url + '?fields=id,name&activate=1');
  }
  status(data:any, param: string = '', url = this.url) {
    return this.http.post(url + '?_method=PATCH' + param, data);
  }
  getUserGeneric(url:any,param:any){
    console.log(url);
    
    if(url == 'transaction_detail' || url == 'cash_deposit_verification' || url == 'deposit_slip_detail' || url == 'transaction_details' || url == 'material_store_placement' || url == 'cheque_deposit'){
      return this.http.get<any>(environment.DEPOSITE_CASH+url+param);
    }
    else{
      return this.http.get<any>(environment.API_URL+url+param);
    }
  }
  getexistingUser(url:any,param:any){
    return this.http.get<any>(url+'?username='+param);
  }
  org_id = '';
  sys_id = '';
  selectOptionService(
    url: URLz,
    p_id = '',
    org_id = this.org_id,
    sys_id = this.sys_id
  ): Observable<any> {
    p_id = p_id != '' ? ('?parent_id='+ p_id) :  p_id;
    org_id =  org_id != '' ? (p_id != '' ? '&organisation_id='+ org_id : '?organisation_id='+ org_id) :  org_id;
    sys_id =  sys_id != '' ? ('&system_id='+ sys_id) :  sys_id;
    return this.http.get<SelectOption[]>(
      environment.API_URL + url + p_id + org_id + sys_id
    );
  }
  getdata(url: URLz,param) {
    return this.http.get<any>(environment.API_URL+url+'?parent_id='+ param+'&organisation_id='+ param)
  }
  saveUserLocalStorage() : Observable<ServerSingleResponse>  {
      return this.http.get<any>(environment.API_URL + URLz.USER_PERMISSION)
  }
  monthlyTarget() : Observable<ServerSingleResponse>  {
    return this.http.get<any>(environment.API_URL + URLz.MONTHLY_TARGET)
}
}
