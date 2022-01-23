import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Hierarchy } from '../interface/common/hierarchy';
import { MonthlyTarget } from '../interface/common/monthly-target';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public local_user: string;
  public multiHierarchy = false;
  // TRANSACTION
  public hierarchy: Hierarchy;
  dontShowPopup = false;
  transBatch: boolean = true;
  monthlyTarget: MonthlyTarget;
  userId: string;
  // For Ngx Loading Spinner
  public isLoading = new BehaviorSubject(false);
  constructor(public injector: Injector) {
    // Service Injection
  }
}
