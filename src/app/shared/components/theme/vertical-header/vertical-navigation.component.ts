import { Component, OnInit, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { StateService } from '../../../../service/state.service';


@Component({
  selector: 'app-vertical-navigation',
  templateUrl: './vertical-navigation.component.html',
  styleUrls: ['./vertical-navigation.component.css'],
})
export class VerticalNavigationComponent implements AfterViewInit, OnInit {
  constructor(
    private translate: TranslateService,
    private _ss: StateService
  ) {
    translate.setDefaultLang('en');
  }
  ngOnInit(): void {
    this.name = this._ss.hierarchy.profile.name;
  }
  ngAfterViewInit() { }

  @Output() toggleSidebar = new EventEmitter<void>();
  public showSearch = false;
  public name: string | any;
  public myProfile = environment.UserProfile + 'Users/profile';
  public userSetting = environment.UserProfile + 'Dashboard/userSettings';
  public logout = environment.UserProfile + 'Login/logout';
  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'fas fa-user',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    },
    {
      btn: 'btn-success',
      icon: 'ti-calendar',
      title: 'Event today',
      subject: 'Just a reminder that you have event',
      time: '9:10 AM'
    },
    {
      btn: 'btn-info',
      icon: 'ti-settings',
      title: 'Settings',
      subject: 'You can customize this template as you want',
      time: '9:08 AM'
    },
    {
      btn: 'btn-primary',
      icon: 'ti-user',
      title: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];
  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'busy',
      from: 'Sonu Nigam',
      subject: 'I have sung a song! See you at',
      time: '9:10 AM'
    },
    {
      useravatar: 'assets/images/users/2.jpg',
      status: 'away',
      from: 'Arijit Sinh',
      subject: 'I am a singer!',
      time: '9:08 AM'
    },
    {
      useravatar: 'assets/images/users/4.jpg',
      status: 'offline',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:00 AM'
    }
  ];
  public selectedLanguage: any = {
    language: 'English',
    code: 'ur',
    type: 'PK',
    icon: 'pk'
  }
  public languages: any[] = [
    // {
    //   language: 'Español',
    //   code: 'es',
    //   icon: 'es'
    // },
    // {
    //   language: 'Français',
    //   code: 'fr',
    //   icon: 'fr'
    // },
    // {
    //   language: 'German',
    //   code: 'de',
    //   icon: 'de'
    // },
    {
      language: 'اردو',
      code: 'ur',
      icon: 'pk'
    },
    {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: 'us'
    },
  ]
  changeLanguage(lang: any) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
  }
  clearLocalStorage() {
    // localStorage.removeItem('permission_data');
    localStorage.clear();
  }
}
