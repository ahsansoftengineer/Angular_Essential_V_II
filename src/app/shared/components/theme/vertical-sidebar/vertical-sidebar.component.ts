import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RouteInfo } from './vertical-sidebar.metadata';
import { VerticalSidebarService } from './vertical-sidebar.service';
import {StateService} from '../../../../service/state.service';

@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html',
  styleUrls: ['./vertical-sidebar.component.scss'],
})
export class VerticalSidebarComponent {
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: RouteInfo[];
  path = '';

  public name : string | any;
  public myProfile = environment.UserProfile+'Users/profile';
  public userSetting = environment.UserProfile+'Dashboard/userSettings';
  public logout = environment.UserProfile+'Login/logout';

  constructor(private menuServise: VerticalSidebarService, private router: Router ,  private _ss : StateService){
    this.fillData(environment.LoadData);
  }
  ngOnInit(): void {
    this.name = this._ss?.hierarchy?.profile?.name;
  }
  fillData(serviceUp: boolean){
    if(serviceUp)
      this.menuServise.getAll().subscribe((res) => {
        this.sidebarnavItems = res.data.records;
        this.setActiveClass();
      })
    else
      this.menuServise.items.subscribe((res) => {
        this.sidebarnavItems = res;
        this.setActiveClass();
      });
  }

  setActiveClass(){
    this.sidebarnavItems.filter(m => {
      m.submenu.filter(
      (s) => {
        if (s.path === this.router.url) {
          this.path = m.title;
        }
        this.addExpandClass(this.path);
      }
    )});
  }
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  clearLocalStorage(){
    // localStorage.removeItem('permission_data');
    localStorage.clear();
  }
}
