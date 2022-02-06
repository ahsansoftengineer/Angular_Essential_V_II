import { Injectable, Injector } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { SelectOption } from 'src/app/interface/common/select';
import { ValidatorService } from 'src/app/service/base.validator.service';
import { FormService } from 'src/app/service/form.service';
import { DonorGSB, DonorGSBForm } from '../donor/donor-gsb.form';
import { DonorInfo, DonorInfoForm } from '../donor/donor-info.form';
import { Cash, TransactionCashForm } from './cash.form';
import { Cheque, TransactionChequeForm } from './cheque.form';
import { Deposit, TransactionDepositForm } from './deposit.form';
import { TransactionDonorAddForm, TransDonorAddInfo } from './donor-additional.form';
import { TRANS } from './enum';
import { Hierarchy, HierarchyForm } from './hierarchy.form';
import { Material, TransactionMaterialForm } from './material.form';

@Injectable({
  providedIn: 'root',
})
/**
 * #SOLID 4 Interface Segregation
 * The Interface Segregation Principle was defined by Robert C. Martin while consulting for Xerox to help them build the software for their new printer systems. He defined it as: “Clients should not be forced to depend upon interfaces that they do not use.”.
 *
 */
export class FullTransactionForm {
  _fs: FormService;
  _vs: ValidatorService;
  constructor(public injector: Injector) {
    this._fs = injector.get(FormService);
    this._vs = injector.get(ValidatorService);
  }
  initForm(trans: TRANS) {
    let donorInfoForm = new DonorInfoForm(this.injector);
    let donorGSBForm = new DonorGSBForm(this.injector);
    let transactionDonorAddForm = new TransactionDonorAddForm(this.injector);
    let hierarchy = new HierarchyForm(this.injector);
    // Cash | Cheque | Deposit | Material;
    let group = this._fs._fb.group({
      currency_id: ['', this._vs._vals('Currency')],
      event_id: [''],
      is_advance: ['0'],
      donor: this._fs._fb.group({
        ...donorInfoForm.initForm().controls,
      }),
      gsb: this._fs._fb.group({
        ...donorGSBForm.initForm().controls,
      }),
      hierarchy: this._fs._fb.group({
        ...hierarchy.initForm().controls,
      }),
      additional_info: this._fs._fb.group({
        ...transactionDonorAddForm.initForm().controls,
      }),
      receipt_details: this._fs._fb.array([this.receiptDetail(trans)]),
    });
    this.setReceiptType(trans, group)
    return group;
  }
  setReceiptType(trans: TRANS, group : FormGroup){
    if (trans == TRANS.CASH || trans == TRANS.CHEQUE) {
      group.addControl('receipt_type', new FormControl(1));
    } else if (trans == TRANS.DEPOSIT) {
      group.addControl('receipt_type', new FormControl(3));
    } else if (trans == TRANS.MATERIAL) {
      group.addControl('receipt_type', new FormControl(4));
    }
  }
  // 1 Receipt Detail Initialization
  receiptDetail(trans: TRANS): FormGroup {
    switch (trans) {
      case TRANS.CASH:
        let cash = new TransactionCashForm(this.injector);
        return this._fs._fb.group({
          ...cash.initForm().controls,
          donationMode: [1, this._vs._vals('Donation Mode')],
        });
      case TRANS.CHEQUE:
        let cheque = new TransactionChequeForm(this.injector);
        return this._fs._fb.group({
          ...cheque.initForm().controls,
          donationMode: [2, this._vs._vals('Donation Mode')],
        });
      case TRANS.DEPOSIT:
        let deposit = new TransactionDepositForm(this.injector);
        return this._fs._fb.group({
          ...deposit.initForm().controls,
          donationMode: [3, this._vs._vals('Donation Mode')],
        });
      case TRANS.MATERIAL:
        let material = new TransactionMaterialForm(this.injector);
        return this._fs._fb.group({
          ...material.initForm().controls,
          donationMode: [4, this._vs._vals('Donation Mode')],
        });
    }
  }
  // 2 Receipt Detail (Adding New)
  addReceiptDetail(trans: TRANS) {
    let custom = <FormArray>this._fs._form.get('receipt_details');
    let recieptDetial = this.receiptDetail(trans);
    custom.push(recieptDetial);
  }
  // 4 Receipt Detail (Updating Data)
  patchReceiptDetail(receiptDetails: any, trans: TRANS, not_copy = true) {
    let formArray = this._fs._form.get('receipt_details') as FormArray;
    if (not_copy && receiptDetails.length > 0) formArray.clear();
    receiptDetails.forEach((d) => {
      let group: FormGroup = this._fs._fb.group({});
      if (trans === TRANS.CASH || trans === TRANS.CHEQUE) {
        if (d.donationMode == 1) {
          let x = new TransactionCashForm(this.injector);
          group = x.initForm(d);
        } else if (d.donationMode == 2) {
          let x = new TransactionChequeForm(this.injector);
          group = x.initForm(d);
        }
      } else if (trans === TRANS.DEPOSIT) {
        let x = new TransactionDepositForm(this.injector);
        d.donationMode = 3
        group = x.initForm(d);
      } else if (trans === TRANS.MATERIAL) {
        let x = new TransactionMaterialForm(this.injector);
        d.donationMode = 4
        group = x.initForm(d);
      }
      if (d.donationMode == 1 || d.donationMode == 2) {
        group.addControl(
          'donationMode', new FormControl(
            d.donationMode,
            this._vs._vals('Donation Mode'),
        ))
      };
      formArray.push(group)
    });
  }
}
export interface Transaction {
  id?: string;
  currency_id?: string;
  is_advance?: number; // Donor / GSB Donor
  receipt_type?: string; // cash 1 / deposit 3 / material 4
  event_id: string; // Madani Basta
  event?: SelectOption;
  currency?: SelectOption;
  receipt_number?: string;
  hierarchy?: Hierarchy;
  donor?: DonorInfo;
  additional_info?: TransDonorAddInfo;
  gsb: DonorGSB;
  // #SOLID 4 Interface Segregation
  receipt_details?: Cash[] | Cheque[] | Deposit[] | Material[];
}
