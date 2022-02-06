import { Injectable, Injector, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SelectOption } from 'src/app/interface/common/select';
import { ValidatorService } from 'src/app/service/base.validator.service';
import { FormService } from 'src/app/service/form.service';
import { Cash, TransactionCashForm } from './cash.form';

@Injectable()
export class TransactionMaterialForm implements OnInit {
  _fs: FormService
  _vs: ValidatorService
  constructor(
    protected injector: Injector,
  ) {
    this._fs = injector.get(FormService)
    this._vs = injector.get(ValidatorService)
  }
  ngOnInit(): void { }
  initForm(d: Material = {}): FormGroup {
    let transactionCashForm = new TransactionCashForm(this.injector);
    return this._fs._fb.group({
      ...transactionCashForm.initForm(d).controls,
      material_item_id: [
        d.material_item_id,
        this._vs._vals('Material Item')
      ],
      weight: [
        d.weight,
        this._vs._val('Weight', { isField: 0 })
      ],
      unit_id: [
        d.unit_id,
        this._vs._vals('Unit')
      ],
      description: [
        d.description,
        this._vs._val('Description', { maxChar: 255, alpha: 1 })
      ],
      material_item: [{value: d.material_item, disabled: true} ],
      unit: [{value: d.unit, disabled: true}],
      // quantity: ['', this._vs._val('Quantity', 0)],
    });
  }
}
export interface Material extends Cash {
  material_item_id?: string;
  weight?: string;
  unit_id?: number;
  description?: string;
  material_item?: SelectOption;
  unit?: SelectOption;
}
