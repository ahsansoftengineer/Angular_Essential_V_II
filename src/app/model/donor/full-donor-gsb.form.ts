import { Injectable, Injector } from '@angular/core';
import { ValidatorService } from 'src/app/service/base.validator.service';
import { FormGroup } from '@angular/forms';
import { DonorGSB, DonorGSBForm } from './donor-gsb.form';
import { DonorInfo, DonorInfoForm } from './donor-info.form';
import { DonorAddInfo, DonorAddInfoForm } from './donor-add-info.form';
import { FormService } from 'src/app/service/form.service';

@Injectable()
export class FullGSBDonorForm {
  _fs: FormService
  _vs: ValidatorService
  constructor(public injector: Injector) {
  this._fs = injector.get(FormService)
  this._vs = injector.get(ValidatorService)
  }
  initForm(): FormGroup {
    let donorInfoForm = new DonorInfoForm(this.injector)
    let donorAddInfoForm = new DonorAddInfoForm(this.injector)
    let donorGSBForm = new DonorGSBForm(this.injector)
    return this._fs._fb.group({
      donor: this._fs._fb.group({
        ...donorInfoForm.initForm().controls,
      }),
      additional_info: this._fs._fb.group({
        ...donorAddInfoForm.initForm().controls,
      }),
      gsb: this._fs._fb.group({
        ...donorGSBForm.initForm().controls,
      })
    })
  }
}
export interface FullGSBDonor {
 gsb: DonorGSB;
 donor: DonorInfo;
 additional_info: DonorAddInfo
}
