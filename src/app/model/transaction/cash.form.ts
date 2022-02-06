import { Injectable, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectOption } from 'src/app/interface/common/select';
import { ValidatorService } from 'src/app/service/base.validator.service';
import { FormService } from 'src/app/service/form.service';
import { StateService } from 'src/app/service/state.service';

@Injectable()
export class TransactionCashForm {
  _fs: FormService;
  _vs: ValidatorService;
  _ss: StateService;
  constructor(protected injector: Injector) {
    this._fs = injector.get(FormService);
    this._vs = injector.get(ValidatorService);
    // this.initForm();
  }
  initForm(cash: Cash = { donationMode: 1 }): FormGroup {
    this._ss = this.injector.get(StateService)
    let accountVal = cash.donationMode === 1 || cash.donationMode === 2 ?
      this._vs._vals('Cash / Cheque Account') : null
      cash.location_id =  !this._ss?.state?.location_status && !cash.location_id ? this._ss?.state?.location_id :  cash.location_id;
      cash.majlis_id = !this._ss?.state?.majlis_status && !cash.majlis_id ? this._ss?.state?.majlis_id :  cash.majlis_id
      cash.purpose_id = !this._ss?.state?.purpose_status && !cash.purpose_id ? this._ss?.state?.purpose_id :  cash.purpose_id
      cash.branch_id = !this._ss?.state?.branch_status && !cash.branch_id ? this._ss?.state?.branch_id :  cash.branch_id
      cash.fund_category_id = !this._ss?.state?.fund_category_status && !cash.fund_category_id ? this._ss?.state?.fund_category_id :
        cash.fund_category_id
      cash.c5 =  this._ss?.state?.c5 && !cash.c5 ? this._ss?.state?.c5 :  cash.c5

    return  this._fs._fb.group({
      is_active: [cash.is_active],
      code: [cash.code],
      row_id: [cash.row_id],
      donationMode: [cash.donationMode],
      amount: [
        cash.amount,
        this._vs._val('Amount', { min: 1, max: 1000000000 }),
      ],
      account_id: [
        cash.account_id,
        accountVal
      ],
      donation_type_id: [
        cash.donation_type_id,
        this._vs._vals('Donation Type')
      ],
      donation_sub_type_id: [
        cash?.donation_sub_type_id,
        this._vs._vals('Donation Sub Type')
      ],
      location_id: [
        cash.location_id,
        this._vs._vals('Location')
      ],
      majlis_id: [
        cash.majlis_id,
        this._vs._vals('Majlis')
      ],
      purpose_id: [
        cash.purpose_id,
        this._vs._vals('Purpose')
      ],
      branch_id: [
        cash.branch_id
        // this._vs._vals('Branch')
      ],
      fund_category_id: [
        cash.fund_category_id
        // this._vs._vals('Fund Category')
      ],
      additionalInfo: [
        cash.additionalInfo,
        this._vs._val('', { maxChar: 255, alpha: 1 }),
      ],
      c5: [
        cash.c5
        // this._vs._vals('C-5')
      ],
      a7: [cash.a7], // , this._vs._val('Analysis 7', 0)
      usher_item_id: [cash.usher_item_id],
      cost_five: [{ value: cash?.cost_five, disabled: true}],
      account: [{ value: cash?.account, disabled: true}],
      fund_category: [{value: cash?.fund_category, disabled: true}],
      majlis: [{value: cash?.majlis, disabled: true}],
      branch: [{ value: cash?.branch, disabled: true} ],
      purpose: [{ value: cash?.purpose, disabled: true} ],
      location: [{ value: cash?.location, disabled: true} ],
      usher_item: [{ value: cash?.usher_item, disabled: true} ],
      // donation_type: { value: [cash?.donation_type, disabled: true} ],
      donation_sub_type: [{ value: cash?.donation_sub_type, disabled: true} ],
    });
  }
}
export interface Cash {
  code?: string; // recm_no
  row_id?: string; // tranno
  donationMode?: number; // tranno
  account_id?: string;
  is_active?: number;
  amount?: string;
  donation_sub_type_id?: string; //donation_sub_type
  fund_category_id?: string; //donation_sub_type
  donation_type_id?: string; // donation_type
  usher_item_id?: string;
  location_id?: string;
  purpose_id?: string;
  branch_id?: string;
  majlis_id?: string;
  bank_id?: string;
  additionalInfo?: string;
  // cost6: string; Removed from All
  c5?: string; // Donation Sub Type
  a7?: string; // Donation Sub Type
  bank?: SelectOption;
  fund_category?: SelectOption;
  majlis?: SelectOption;
  account?: SelectOption;
  purpose?: SelectOption;
  location?: SelectOption;
  branch?: SelectOption;
  usher_item?: SelectOption;
  donation_type?: SelectOption;
  donation_sub_type?: SelectOption;
  cost_five?: SelectOption;
}
