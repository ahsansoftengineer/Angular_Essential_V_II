import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  constructor(public injector: Injector) {
    // Service Injection
  }
}
