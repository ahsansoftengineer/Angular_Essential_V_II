import { Injectable, Injector } from '@angular/core';
import { ValidatorService } from 'src/app/service/base.validator.service';
import { FormGroup } from '@angular/forms';
import { SelectOption } from 'src/app/interface/common/select';
import { FormService } from 'src/app/service/form.service';

@Injectable()
export class DonorGSBForm {
  _fs: FormService
  _vs: ValidatorService;
  constructor(injector: Injector) {
  this._fs = injector.get(FormService)
  this._vs = injector.get(ValidatorService);
  }
  initForm(): FormGroup {
    return this._fs._fb.group({
      area: ['', this._vs._val('Area (Govt) ', { minChar: 4 })],
      near_by: ['', this._vs._val('Near By', { minChar: 4 })],
      bg: ['', this._vs._vals('Business Group')],
      le: ['', this._vs._vals('Legal Entity')],
      ou: ['', this._vs._vals('Operting Unit')],
      su: ['', this._vs._vals('Sub Unit')],
      collector_id: ['', this._vs._val('Collector')], // collector
      collector: [''], // collector
      part_of_di: ['', this._vs._vals('Willing to Join Dawat-e-Islami')],
      followup: ['', this._vs._vals('Follow Up')],
      // followup_date:[
      //   '',
      //   this._vs._vals('any day for follow up')
      // ],
      amount_purpose: ['', this._vs._vals('Donation Option')],
      // Default Nothing
      // late:['',
      //   this._fb.array([
      //     this._fb.group({
      //       name: this._vs._validator('Name'),
      //       amount: this._vs._validator('Amount')
      //     })
      //   ])
      // ], // Donation Option
      // individual:['', this._vs._vals('Amount')], // Donation Option
    });
  }
}
export interface DonorGSB {
  area: string; // (Govt)
  near_by: string;
  bg: string;
  le: string;
  ou: string;
  su: string;
  collector_id: string;
  department_id: string;
  organisation_id: string;
  branch_id: string;
  followup: string; // yes | no
  // (Willing to Join Dawat-e-Islami)
  part_of_di: string; // yes | no
  followup_date: number; // 1 - 30
  // donationOption
  amount_purpose: string; // family | individual | late
  late?: Late[]; // late
  individual?: number; // individual
  user: SelectOption; // AutoComplete
  department: SelectOption; // AutoComplete
  // Not Required Fields in Table
  // legal_Entity: SelectOption
  // operating_unit:SelectOption
  // sub_unit:SelectOption
  // branch:SelectOption
}
export interface Late {
  name: string;
  amount: string;
}
