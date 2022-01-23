import { Injector } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from 'src/app/service/base.validator.service';
import { FormHelperService } from 'src/app/service/form-helper.service';
import { environment } from 'src/environments/environment';
import { IMG_URL } from '../constant/image';
import { URLz } from '../enums/url.enum';
import { HttpServiceParam } from '../interface/common/http-service-param';
import { BaseService } from '../service/base.service';
import { FormService } from '../service/form.service';
import { HTTPService } from '../service/http.service';
import { StateService } from '../service/state.service';
import { MethodService } from '../service/method.service';
import { ControlStateService } from '../shared/components/control/control.state.service';
import { Custom } from '../static/custom';
// In Base Class append all the properties / methods with _ (underscore)

// # 1 SOLID PRINCIPLE (Single Responsibility Principle)
// 1. Single responsibility principle: a class should have one, and only one, reason to change;
// 2. When you only want to Inject a Service
export abstract class BaseServiceInjector {
  // Angular Services
  _activeRoute: ActivatedRoute;
  _router: Router;
  _dialog: MatDialog;
  _fb: FormBuilder;

  // Local Services
  _http: HTTPService;
  _fs: FormService;
  _vs: ValidatorService;
  _fhs: FormHelperService;
  _ms : MethodService;
  _css: ControlStateService;
  _ss: StateService;
  /**
   * @deprecated USE _http Instead
   */
  _service: BaseService;

  // Enum Global Property for HTML Template
  URLz = URLz; // For Template Purpose
  IMG_URL = IMG_URL; // For Template Purpose
  param: HttpServiceParam = {}; // Override this Property for Default Behaviour of HTTP Request

  // Guard Related Properties
  _activeGuard = true;
  _activeId: string;
  _isExist: boolean;
  constructor(public injector: Injector) {
    this._router = injector.get(Router);
    this._activeRoute = injector.get(ActivatedRoute);
    this._fb = injector.get(FormBuilder);
    this._dialog = injector.get(MatDialog);

    this._http = injector.get(HTTPService);
    this._fs = injector.get(FormService);
    this._vs = injector.get(ValidatorService);
    this._fhs = injector.get(FormHelperService);
    this._ms = injector.get(MethodService);
    this._css = injector.get(ControlStateService);
    this._ss = injector.get(StateService);

  }
  // Wil be Removed in Next Version
  resetProperties() {
    this._service = this.injector.get(BaseService);
    this._service.url = environment.API_URL;
    this._service.org_id = '';
    this._service.sys_id = '';
    this._fhs._activeRoute = this._activeRoute;
    this._fb = this._fs._fb;
  }
  emptyCheck(val: any) {
    return Custom.emptyCheck(val);
  }
  mergeParam(providedParameters: HttpServiceParam) {
    return { ...this.param, ...providedParameters };
  }
}
