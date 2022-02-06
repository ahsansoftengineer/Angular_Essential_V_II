import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Analysis, AnalysisFlat } from './DynamicFlatNode';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { URLz } from 'src/app/enums/url.enum';
import { Custom } from 'src/app/static/custom';
@Injectable({
  providedIn: 'root',
})
export class DynamicDatabase {
  public http: HttpClient
  constructor(injector: Injector){
    this.http = injector.get(HttpClient)
  }
  user_id: string = null;
  treeCases = 0;
  isExpandable(node: AnalysisFlat): boolean {
    return node.expandable;
  }
  dataChange = new BehaviorSubject<Analysis[]>([]);
  get data(): Analysis[] {
    return this.dataChange.value;
  }
  dbForm: any;
  // ?user_id=145&system_id=5&organisation_id=12&parameters=1&level=2&id=01
  getAnalysis(
    param: string = '',
    ): Observable<any> {
      if(this.treeCases == 2){
        return this.http.get<AnalysisFlat[]>(
          environment.API_URL + URLz.ANALYSIS_PURPOSE_PERMISSION_TREE +
          '?'+ param)
      } else if(this.user_id === null && this.treeCases == 0){
        return this.http.get<AnalysisFlat[]>(
          environment.API_URL + URLz.ANALYSIS_PERMISSION_TREE +
          '?'+ param)
      } else  {
        return this.http.get<AnalysisFlat[]>(
          environment.API_URL + URLz.ANALYSIS_PERMISSION_USER_TREE +
          '?'+ param)
      }

  }
  saveAnalysis(
    data: any,
    param: any = '', // Form Fields
    url: URLz = URLz.ANALYSIS_PERMISSION_TREE): Observable<any> {
    url = this.treeCases == 2 ? URLz.ANALYSIS_PURPOSE_PERMISSION_TREE : URLz.ANALYSIS_PERMISSION_TREE
    param = param === '' ? '' : param;
      return this.http.post(
        environment.API_URL + url, data).
        pipe(catchError(Custom.handleError));
  }
}
