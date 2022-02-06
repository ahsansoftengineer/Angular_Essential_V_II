import { Component , Injector, OnInit  } from '@angular/core';
import { BaseServiceInjector } from './class/base-service-injector';
import { BaseService } from './service/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends BaseServiceInjector implements OnInit{
  public targetData
  constructor(
    injector : Injector,
   public httpservice : BaseService
  ){
    super(injector);
  }
  ngOnInit(): void {
  }
}
