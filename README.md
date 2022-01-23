# Angular_Essential_V_II
## Angular Component Based Approach
### Responsible to Inject all Services 
#### Angular Services
```javascript
  _activeRoute: ActivatedRoute;
  _router: Router;
  _dialog: MatDialog;
  _fb: FormBuilder;
```
#### Local Services
```javascript
 _http: HTTPService;
 _fs: FormService;
 _vs: ValidatorService;
 _fhs: FormHelperService;
 _ms : MethodService;
 _css: ControlStateService;
 _ss: StateService;
```
#### Global Properties 
> * For Template Purpose
```javascript
 URLz = URLz;
 IMG_URL = IMG_URL; 
```
> * Override this Property for Default Behaviour of HTTP Request
```javascript
  param: HttpServiceParam = {}; 
```
> * Common Properties in (Base List / Base Form) 
```javascript
 _activeGuard = true;
 _activeId: string;
 _isExist: boolean;
```
> * Common Methods in (Base List / Base Form) 
```javascript
  emptyCheck(val: any) {
    return Custom.emptyCheck(val);
  }
  mergeParam(providedParameters: HttpServiceParam) {
    return { ...this.param, ...providedParameters };
  }
```