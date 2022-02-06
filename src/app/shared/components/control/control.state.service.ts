import { Injectable, Injector } from '@angular/core';
import { SelectOption } from 'src/app/interface/common/select';

@Injectable({
  providedIn: 'root'
})
export class ControlStateService {
  _ddOneTimeLoad: OneTimeLoadArray = {}
  loading = []

  arrayOfObject: any = [{}]
  constructor(public injector: Injector) {
  }
}
interface OneTimeLoadArray{
  [key: string]: SelectOption[]
}
