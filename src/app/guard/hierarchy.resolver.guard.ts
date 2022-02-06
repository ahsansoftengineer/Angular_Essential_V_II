import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { URLz } from '../enums/url.enum';
import { Hierarchy } from '../interface/common/hierarchy';
import { BaseService } from '../service/base.service';
import { HTTPService } from '../service/http.service';
import { StateService } from '../service/state.service';
import { Custom } from '../static/custom';

// How to Create a Guard?
// Follow Three Steps
// 1. Build the Route Guard
// 2. Register the guard (portal.module.ts)
// 3. Tie the Guard a route. (portal-routing.module.ts)
@Injectable({ providedIn: 'root' })
export class HierarchyResolverGuard implements Resolve<BaseService> {
  constructor(
    private _http: HTTPService,
    private _ss: StateService,
    private cookie: CookieService
  ) // private storeService: StoreService
  {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    let storedData = localStorage.getItem('permission_data_server');
    let data: Hierarchy;
    if (Custom.emptyCheck(storedData)) {
      data = JSON.parse(atob(storedData));
    }
    if (!storedData && !data?.profile?.username) {
      return this._http.get({endpoint: URLz.USER_PERMISSION}).pipe(
        tap((res) => {
          let d: Hierarchy = res.data.row;
          localStorage.setItem('permission_data_server', btoa(JSON.stringify(d)));
          if (d?.profile?.username) {
            this._ss.hierarchy = d;
            return d;
          } else return of(false);
        })
      );
    } else {
      return of((this._ss.hierarchy = data));
    }
    // if (!this._ss.hierarchy) {
    //   return this._http.get({endpoint: URLz.USER_PERMISSION}).pipe(
    //     tap((res) => {
    //       let d = res.data.row;
    //       localStorage.setItem('permission_data', btoa(JSON.stringify(d)));
    //       if (d?.profile?.username) {
    //         this._ss.hierarchy = d;
    //         this._ss.state = d;
    //         this._ss.hierarchy.is_Refresh = false
    //         return d;
    //       } else return of(false);
    //     })
    //   );
    // }
  }
}
