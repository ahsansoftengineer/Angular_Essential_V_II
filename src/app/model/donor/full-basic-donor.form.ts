import { Injectable, Injector } from '@angular/core';
import { ValidatorService } from 'src/app/service/base.validator.service';
import { FormService } from 'src/app/service/form.service';
import { DonorAddInfo, DonorAddInfoForm } from './donor-add-info.form';
import { DonorInfo, DonorInfoForm } from './donor-info.form';

@Injectable()
export class FullBasicDonorForm {
  _fs: FormService
  _vs: ValidatorService;
  constructor(public injector: Injector) {
  this._fs = injector.get(FormService)
  this._vs = injector.get(ValidatorService);
  }
  initForm() {
    let donorInfoForm = new DonorInfoForm(this.injector);
    let donorAddInfoForm = new DonorAddInfoForm(this.injector);
    return this._fs._fb.group({
      donor: this._fs._fb.group({
        ...donorInfoForm.initForm().controls,
      }),
      additional_info: this._fs._fb.group({
        ...donorAddInfoForm.initForm().controls,
      }),
    });
  }
}

export interface FullBasicDonor {
  donor: DonorInfo;
  additional_info: DonorAddInfo;
}
