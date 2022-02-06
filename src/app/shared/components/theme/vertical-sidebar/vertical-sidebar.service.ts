import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RouteInfo } from './vertical-sidebar.metadata';
import { ROUTES } from './vertical-menu-items';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VerticalSidebarService {
  public url = environment.API_URL;
  public screenWidth: any;
  public collapseSidebar: boolean = false;
  public fullScreen: boolean = false;
  public userId;
  dataLoaded = new EventEmitter<RouteInfo[]>();
  constructor(private http: HttpClient) {
    environment.API_URL;
    this.url = environment.API_URL + 'moduleList';
    // this.userId = localStorage.getItem('accessUser');
    this.getAll();
  }
  MENUITEMS: RouteInfo[] = ROUTES;
  items = new BehaviorSubject<RouteInfo[]>(this.MENUITEMS);
  getAll() {
    return this.http.get<any>(this.url);
  }

}
