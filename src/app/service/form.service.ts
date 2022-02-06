import { Injectable, Injector } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
	_form : FormGroup
	_fb : FormBuilder
	_formArray : FormArray
	_formGroup : FormGroup
	_control : FormControl
  constructor(injector: Injector) {
    this._fb = injector.get(FormBuilder);
    this._form = this._fb.group({});
    this._formArray = this._fb.array([]);
    this._formGroup = this._fb.group({});
    this._control = this._fb.control([])
  }
}
