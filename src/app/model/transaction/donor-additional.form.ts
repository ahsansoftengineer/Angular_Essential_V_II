import { Injectable, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectOption } from 'src/app/interface/common/select';
import { ValidatorService } from 'src/app/service/base.validator.service';
import { FormService } from 'src/app/service/form.service';
import { DonorAddInfo } from '../donor/donor-add-info.form';
import { DonorAddInfoForm } from '../donor/donor-add-info.form';

@Injectable()
export class TransactionDonorAddForm {
  _fs: FormService;
  _vs: ValidatorService;
  constructor(public injector: Injector) {
    this._fs = injector.get(FormService);
    this._vs = injector.get(ValidatorService);
  }
  initForm(): FormGroup {
    let donorAddInfoForm = new DonorAddInfoForm(this.injector);
    return this._fs._fb.group({
      ...donorAddInfoForm.initForm().controls,
      displayName: ['', this._vs._val('', { alpha: 1 })],
      careOf: ['', this._vs._val('', { minChar: 11, maxChar: 15, num: 1 })],
      careOfName: ['', this._vs._val('', { alpha: 1 })],
      mr: ['', this._vs._val('', { maxChar: 10, num: 1 })],
    });
  }
  patchForm(d: TransDonorAddInfo) {
    this._fs._form.patchValue({
      gender: d.gender,
      email: d.email,
      address: d.address,
      displayName: d.displayName,
      careOf: d.careOf,
      careOfName: d.careOfName,
      mr: d.mr,
    });
  }
}
export interface TransDonorAddInfo extends DonorAddInfo {
  displayName?: string;
  careOf?: string;
  careof: SelectOption
  careOfName?: string;
  mr?: string;
}
