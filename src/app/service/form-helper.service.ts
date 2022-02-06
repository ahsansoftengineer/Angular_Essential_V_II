import {Injectable, Injector } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidatorService } from './base.validator.service';
import { FormService } from './form.service';
import { DatePipe } from '@angular/common';
import { Hierarchy } from '../interface/common/hierarchy';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})

export class FormHelperService {

  _router: Router;
  _activeRoute: ActivatedRoute
  _fs: FormService;
  _vs: ValidatorService;
  _pathLocation: string;
  date: Date;
  constructor(public injector: Injector,private datePipe: DatePipe ,private _snackBar: MatSnackBar) {
    // Service Injection
    this._fs = injector.get(FormService);
    this._vs = injector.get(ValidatorService);
    this._activeRoute = injector.get(ActivatedRoute);
    this._router = injector.get(Router);
  }
  _getCurrentdatenadTime(){
    this.date=new Date();
    let currentDateTime;
     return currentDateTime =this.datePipe.transform((new Date), 'dd-MMM-yyyy h:mm a');
  }
  _dateConverter(date: string){
     return this.datePipe.transform(date, 'dd-MMM-yyyy h:mm a');
  }
  _dateOnly(date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  _dateOnlyWithMonth(date){
    return this.datePipe.transform(date, 'yyyy-MMM-dd');
  }

  _getuserPermission(){
    let storedData = localStorage.getItem('permission_data')
    let data : Hierarchy
    if(storedData != null && storedData != undefined && storedData != ''){
      data = JSON.parse(atob(storedData));
      return data;
    }
  }

  _disableButton(arr){
    if(arr.value.length > 0){
      return true;
    }
    else if(arr.value.length == 0){
      return false;
    }
  }

  _disable_simple_array(arr){
    if(arr.length > 0){
      return true;
    }
    else if(arr.length == 0){
      return false;
    }
  }

  openSnackBar(message,action,hrizontal,vertical) {
   let durationInSeconds = 3;
   let horizontalPosition : MatSnackBarHorizontalPosition = hrizontal;
   let verticalPosition : MatSnackBarVerticalPosition = vertical;
    this._snackBar.open(message, action, {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
      duration: durationInSeconds * 1000,
    });
  }


  _numberTostring(number){
    const first = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
    const tens = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
    const mad = ['', 'thousand', 'million', 'billion', 'trillion'];
    let word = '';

    for (let i = 0; i < mad.length; i++) {
      let tempNumber = number%(100*Math.pow(1000,i));
      if (Math.floor(tempNumber/Math.pow(1000,i)) !== 0) {
        if (Math.floor(tempNumber/Math.pow(1000,i)) < 20) {
          word = first[Math.floor(tempNumber/Math.pow(1000,i))] + mad[i] + ' ' + word;
        } else {
          word = tens[Math.floor(tempNumber/(10*Math.pow(1000,i)))] + '-' + first[Math.floor(tempNumber/Math.pow(1000,i))%10] + mad[i] + ' ' + word;
        }
      }

      tempNumber = number%(Math.pow(1000,i+1));
      if (Math.floor(tempNumber/(100*Math.pow(1000,i))) !== 0) word = first[Math.floor(tempNumber/(100*Math.pow(1000,i)))] + 'hunderd ' + word;
    }
      return word;
  }



   // Helper Methods
  _switch(pathLocation: string = this._pathLocation) {
    this._fs._form.reset();
    this._router.navigate([pathLocation]);
  }

  _switchWithReload(){
    this._fs._form.reset();
    window.location.reload();
  }
  // Drop Down Selected Value
  _dd_selected(
    control: string,
    value: string,
    form: FormGroup = this._fs._form
  ) {
    return form.value[control] === value;
  }

  _dd_filter_selected(
    control: string,
    value: string,
  ) {
    return control === value;
  }

  // Check whether field exsit in the Form
  _has(
    fieldName: string,
    fg: FormGroup = this._fs._form) {
    return fg?.contains(fieldName)
  }
  _hasVal(
    fieldName: string,
    fg: FormGroup = this._fs._form) {
      return this._getVal(fieldName, fg) === '' || this._getVal(fieldName, fg) === null || this._getVal(fieldName, fg) === undefined  ? false : true
  }
  _hasGroup(
    groupName: string,
    fieldName: string,
    ) {
      let group = this._fs._form.get(groupName) as FormGroup
      return group.contains(fieldName)
  }

  _getVal(control: string, group: FormGroup = this._fs._form){
    return group?.get(control)?.value
  }

  _getInner(
    fieldName: string,
    groupName: string = '') {
      if(this._fs._form.contains(groupName)){
        let innerGroup = this._fs._form.get(groupName) as FormGroup
        return innerGroup.get(fieldName)
      }
  }

  // If Control Exsit then reset the value
  _emptyValue(
    fieldName: string,
    formGroup: FormGroup = this._fs._form
    ){
    if (formGroup.contains(fieldName))
      formGroup.get(fieldName).setValue('');
  }
  _getURLParam(queryParam: string){
    return this._activeRoute.snapshot.paramMap.get(queryParam)
  }
  _disable(
    fieldName: string,
    fg: FormGroup = this._fs._form) {
    return fg?.get(fieldName)?.disabled
  }
  // Future Reference
  // Both addControl and removeControl not required
  // Doesn't Required Check
  _addControl(
    fieldName: string,
    message: string,
    value: string = '',
    validator = this._vs._validator(message, 0),
    formGroup: FormGroup = this._fs._form
    ) {
      if(!formGroup.contains(fieldName))
      formGroup.addControl(
      fieldName,
      new FormControl([value, validator])
    );
  }
  // Doesn't Required Check
  _rmvControl(
    fieldName: string,
    formGroup: FormGroup = this._fs._form) {
    if (formGroup.contains(fieldName)) {
      formGroup.removeControl(fieldName)
    }
  }
  // For Resetting Complete Form Doesn't Required Reset is Optimized
  _resetForm(group: FormGroup | FormArray) {
    Object.keys(group.controls).forEach((key: string) => {
      const acc = group.get(key); // Abstract Control
      if (acc instanceof FormGroup ||
        acc instanceof FormArray) {
        this._resetForm(acc);
      } else if (acc instanceof FormControl) {
        acc.patchValue('', { emitEvent: false });
      }
    });
  }

  // It behave like getter don't use it to add / remove control
  _getArray(array: string){
    return this._fs._form.get(array) as FormGroup
  }
  _getControl(control: string){
    return this._fs._form.get(control) as FormGroup
  }
  _getGroup(group: string){
    return this._fs._form.get(group) as FormGroup
  }

}
