import { Injectable, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidatorService } from 'src/app/service/base.validator.service';
import { FormService } from 'src/app/service/form.service';
import { Cash, TransactionCashForm } from './cash.form';

@Injectable()
export class TransactionDepositForm {
  _fs: FormService;
  _vs: ValidatorService;
  constructor(protected injector: Injector) {
    this._fs = injector.get(FormService);
    this._vs = injector.get(ValidatorService);
  }
  initForm(d: Deposit = {}): FormGroup {
    let transactionCashForm = new TransactionCashForm(this.injector);
    return this._fs._fb.group({
      ...transactionCashForm.initForm(d).controls,
      bank_id: [
        d.bank_id,
        this._vs._vals('Deposit Bank')
      ],
      branchCode: [
        d.branchCode,
        this._vs._val('Branch Code')
      ],
      depositSlipNumber: [
        d.depositSlipNumber,
        this._vs._val('Deposit Slip Number')
      ],
      depositDate: [
        d.depositDate,
        [
          this._vs._val('Deposit Date'),
          this._vs._val_Date({minDate: new Date()})
        ]
      ],
      bank: [{value: d.bank, disabled: true}],

    });
  }
}
export interface Deposit extends Cash {
  branchCode?: string;
  depositSlipNumber?: string;
  depositDate?: string;
}
