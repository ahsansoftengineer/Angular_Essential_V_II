import { Injectable, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HierarchyOnly } from 'src/app/interface/common/hierarchy';
import { SelectOption } from 'src/app/interface/common/select';
import { ValidatorService } from 'src/app/service/base.validator.service';
import { FormService } from 'src/app/service/form.service';
import { HierarchyForm } from './hierarchy.form';

@Injectable()
export class BankDirectDepositUploadForm {
  _fs: FormService
  _vs: ValidatorService
  constructor(public injector: Injector) {
    this._fs = injector.get(FormService)
    this._vs = injector.get(ValidatorService)
  }
  initForm(d: BankDirectDepositUpload = {}): FormGroup {
    let hierarchyForm = new HierarchyForm(this.injector);
    return this._fs._fb.group({
      ...hierarchyForm.initForm(d).controls,
      donation_type_id: [
        d.donation_type_id,
        this._vs._vals('Donation Type')
      ],
      bank_id: [
        d.donation_type_id,
        this._vs._vals('Bank')
      ],
    });
  }
}
export interface BankDirectDepositUpload extends HierarchyOnly {
  donation_type_id?: string;
  bank_id?: string;
  donation_type?: SelectOption;
  bank?: SelectOption;

}

