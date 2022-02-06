import { Injectable, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HierarchyOnly } from 'src/app/interface/common/hierarchy';
import { SelectOption } from 'src/app/interface/common/select';
import { ValidatorService } from 'src/app/service/base.validator.service';
import { FormService } from 'src/app/service/form.service';

@Injectable()
export class HierarchyForm {
  _fs: FormService
  _vs: ValidatorService
  constructor(public injector: Injector) {
    this._fs = injector.get(FormService)
    this._vs = injector.get(ValidatorService)
  }
  initForm(d: Hierarchy = {}): FormGroup {
    return this._fs._fb.group({
      organisation_id: [
        d.organisation_id,
        this._vs._vals('Organization')
      ],
      system_id: [
        d.system_id, this._vs._vals('System')
      ],
      bg: [
        d.bg,
        this._vs._vals('Business Group')
      ],
      le: [
        d.le,
        this._vs._vals('Legal Entity')
      ],
      ou: [
        d.ou,
        this._vs._vals('Operating Unit')
      ],
      su: [
        d.su, this._vs._vals('Sub Unit')
      ],
      // dco: [
      //   d.dco, this._vs._vals('Donation Cell Office')
      // ],
    });
  }
}
export interface Hierarchy extends HierarchyOnly {
}

