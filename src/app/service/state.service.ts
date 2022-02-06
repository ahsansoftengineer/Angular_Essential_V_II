import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Hierarchy, State } from '../interface/common/hierarchy';
import { MonthlyTarget } from '../interface/common/monthly-target';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public local_user: string;
  public multiHierarchy = false;
  // TRANSACTION
  public hierarchy: Hierarchy;
  public state: State;
  transHierarchySaveDefault = false;
  transBatch: boolean = true;
  monthlyTarget: MonthlyTarget;
  userId: string;
  // For Ngx Loading Spinner
  public isLoading = new BehaviorSubject(false);
  constructor(public injector: Injector) {
    // Service Injection
  }
}
