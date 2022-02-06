import { Injectable, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectOption } from 'src/app/interface/common/select';
import { ValidatorService } from 'src/app/service/base.validator.service';
import { FormService } from 'src/app/service/form.service';

@Injectable()
export class BankDirectDepositEditForm {
  _fs: FormService
  _vs: ValidatorService
  constructor(public injector: Injector) {
    this._fs = injector.get(FormService)
    this._vs = injector.get(ValidatorService)
  }
  initForm(d: BankDirectDepositEdit = {}): FormGroup {
    return this._fs._fb.group({
      id: [d.id],
      bank_direct_deposit_id: [d.bank_direct_deposit_id],
      deposit_slip: [
        d.deposit_slip,
        this._vs._val('Deposit Slip', { num: 1, maxChar: 20 })
      ],
      branch_id: [d.branch_id, this._vs._vals('Branch')],
      location_id: [d.location_id, this._vs._vals('Location')],
      majlis_id: [d.majlis_id, this._vs._vals('Majlis')],
      purpose_id: [d.purpose_id, this._vs._vals('Purpose')],
      donation_sub_type_id: [d.donation_sub_type_id, this._vs._vals('Donation Sub Type')],
      depositDate: [d.depositDate, this._vs._val_Date({})],
      chequeDate: [d.chequeDate, this._vs._val_Date({})],
      // chequeNumber: [d.chequeNumber, this._vs._val_Date({})],
      amount: [d.amount, this._vs._val('Amount', { num: 1 })],
      description: [d.description,this._vs._val('Description', { specialChar: 1 })],
      mobile: [d.mobile, this._vs._vals('Mobile')],
      name: [d.name, this._vs._val('Name', { alpha: 1 })],
      bank_branch_code: [d.bank_branch_code,this._vs._val('Branch Code', { num: 1 })],

      is_active: [d.is_active],
      branch: [d.branch],
      majlis: [d.majlis],
      location: [d.location],
      purpose: [d.purpose],
      donation_sub_type: [d.donation_sub_type],
    });
  }
}
export interface BankDirectDepositEdit {
  id?: string;
  bank_direct_deposit_id?: string;
  deposit_slip?: string;
  branch_id?: string;
  majlis_id?: string;
  location_id?: string;
  purpose_id?: string;
  donation_sub_type_id?: string;
  depositDate?: string;
  chequeDate?: string;
  chequeNumber?: string;
  amount?: string;
  description?: string;
  mobile?: string;
  name?: string;
  bank_branch_code?: string;
  is_active?: string;
  branchCode?: string,
  branch?: SelectOption;
  majlis?: SelectOption;
  location?: SelectOption;
  purpose?: SelectOption;
  donation_sub_type?: SelectOption;
  // cnic?: string;
  // email?: string;
  // instrument_number: string;
  // drawn_on_bank: string;
  // created_at: string;
  // updated_at: string;
  // created_by: string;
  // updated_by: string;
  // deleted_at: string;
}

