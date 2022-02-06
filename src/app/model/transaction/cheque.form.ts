import { Injectable, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectOption } from 'src/app/interface/common/select';
import { ValidatorService } from 'src/app/service/base.validator.service';
import { FormService } from 'src/app/service/form.service';
import { Cash, TransactionCashForm } from './cash.form';

@Injectable()
export class TransactionChequeForm {
  _fs: FormService;
  _vs: ValidatorService;
  constructor(protected injector: Injector) {
    this._fs = injector.get(FormService);
    this._vs = injector.get(ValidatorService);
  }
  initForm(d: Cheque = {}): FormGroup {
    let transactionCashForm = new TransactionCashForm(this.injector);
    return this._fs._fb.group({
      ...transactionCashForm.initForm(d).controls,
      bank_id: [d.bank_id, this._vs._vals('Bank')],
      branchCode: [d.branchCode, this._vs._val('Branch Code')],
      chequeNumber: [d.chequeNumber, this._vs._val('Cheque Number')],
      chequeDate: [
        d.chequeDate,
        [
          this._vs._val('Cheque Date', { isField: 0 }),
        ],
        // Shaheer Bhi
        // this._vs._val_Date({ maxDate: new Date() })
      ],
      bank: [{value: d.bank, disabled: true} ],
    });
  }
}
export interface Cheque extends Cash {
  branchCode?: string;
  chequeNumber?: string;
  chequeDate?: string;
}
