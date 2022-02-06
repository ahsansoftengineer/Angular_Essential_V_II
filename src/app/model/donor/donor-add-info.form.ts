import { Injectable, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidatorService } from 'src/app/service/base.validator.service';
import { FormService } from 'src/app/service/form.service';

@Injectable()
export class DonorAddInfoForm {
  _fs: FormService
  _vs: ValidatorService;
  constructor(injector: Injector) {
  this._fs = injector.get(FormService)
  this._vs = injector.get(ValidatorService);
  }
  initForm(): FormGroup {
    return this._fs._fb.group({
      email: ['', this._vs._validator('', 1, 0, 50, 0, 0, 0, 0, 1)],
      gender: [''],
      address: ['', this._vs._validator('', 1, 0, 255, 0, 0, 0, 1)],
    });
  }
}
// Basic Donor Info
export interface DonorAddInfo {
  gender?: string;
  email?: string;
  address?: string;
}
