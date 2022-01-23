import { Injectable, Injector } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegExps } from '../static/regex';
import { Server_Response } from '../interface/common/errors';
import { ImgType } from '../interface/common/img-type';
import { FormService } from './form.service';
import { Custom } from '../static/custom';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  _submitted = false;
  _toastr: ToastrService;
  _fs: FormService;
  constructor(injector: Injector) {
    this._toastr = injector.get(ToastrService);
    this._fs = injector.get(FormService);
  }
  // Below Method is to Display Error Messages
  _error(name: string, group: FormGroup = this._fs._form): ValidationMessage {
    let control = group?.controls[name];
    if (control?.touched && control?.errors) {
      return control?.errors['ERROR'];
    }
  }
  _error_control(control: FormControl): ValidationMessage {
    if (control?.errors)
      return control?.errors['ERROR'];
  }
  _error_image(img: ImgType) {
    if (img.error === 'type') {
      return 'Only jpeg | jpg | jfif & png are allowed';
    } else if (img.error === 'size') {
      return 'Image Size is Greater than 2MB';
    } else if (!img.link && this._submitted) {
      return 'Please select ' + img.display;
    } else return '';
  }
  _error_server(server_response: Server_Response) {
    server_response?.errors?.forEach((error) => {
      let msg = error.detail[0].message;
      if (msg.length < 1) msg = 'No Server Error Message Provided';
      this._toastr.error(msg, this.toTitleCase(error.field_name));
    });
  }
  private toTitleCase(str) {
    if (str) {
      let field = str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
      return field.replaceAll('_', ' ').replace('id', '');
    } else return 'No Property Provided';
  }
  _error_FormArray(internalGroup: FormGroup, control: string): ValidationMessage {
    let controlz = internalGroup?.get(control);
    if (controlz?.touched && controlz?.errors) {
      return controlz.errors['ERROR'];
    } else return null;
  }
  _error_FormGroupName(group: string, control: string): ValidationMessage {
    let fg = this._fs._form?.get(group) as FormGroup;
    let controlz = fg?.get(control);
    if (controlz?.touched && controlz?.errors) {
      return fg?.get(control)?.errors['ERROR'];
    }
    return null;
  }
  // Imporved Version of Validator
  /**
    Global Validator Version 1.0.2
  */
  _val(fn: Partial<string> = '', param: Partial<ValidatorParam> = {
    maxChar: 100
  }) {
    return (
      control: AbstractControl
    ): Validation | null => {
      if (fn) param.fn = fn
      let a: string = control.value;
      if (
        (param.fn != '' && fn != '') &&
        (a === '' || a == null || a == undefined || a == '0')
      ) {
        if (param.isField == undefined)
          return MSG('REQUIRED', 'Please enter ' + param.fn);
        else
          return MSG('REQUIRED','Please select ' + param.fn);
      } else if (a !== '' && a !== null && a !== undefined) {
        if (!RegExps.WHITE_SPACE.test(a))
          return MSG('WHIE_SPACE','White space not allowed');
        else if (param.maxChar && a.length > param.maxChar)
          return  MSG('MAX_CHAR','Maximum ' + param.maxChar + ' characters allowed')
        else if (param.minChar && a.length < param.minChar)
          return MSG('MIN_CHAR','Minimum ' + param.minChar + ' characters allowed')
        else if (param.min && Number(a) < param.min)
          return MSG('MIN','Minimum value ' + param.min + ' allowed')
        else if (param.max && Number(a) > param.max)
          return MSG('MAX','Maximum value ' + param.max + ' allowed')
        else if (param.num && !RegExps.NUM.test(a))
          return MSG('NUM','Only numbers allowed')
        else if (param.num && !RegExps.POSITIVENUM.test(a))
          return MSG('NUM','Only positive numbers allowed')
        else if (param.alpha && !RegExps.ALPHA.test(a))
          return MSG('ALPHA','Only alphabets allowed')
        else if (param.alphaNum && !RegExps.ALPHANUM.test(a))
          return MSG('ALPHANUM','Only alphabets and numbers allowed')
        else if (param.specialChar && RegExps.SPECIALCHARS.test(a))
          return MSG('PATTERN','Special character not allowed')
        else if (param.email && !RegExps.EMAIL.test(a))
          return MSG('EMAIL','Invalid email containing “@, .com”')
        else if (param.password && !RegExps.PASSWORD.test(a))
          return MSG('PASSWORD',
                'Invalid password Must contains Upper Case, Lower Case, Number and Special Character.')
        else return null;
      }
    };
  }
  // For Select / AutoComplete / Radio Button / Checkbox
  _vals(fn: Partial<string> = '') {
    return (
      control: AbstractControl
    ): Validation | null => {
      let a: string = control.value;
      if (a === '' || a == null || a == undefined || a == '0')
        return MSG('REQUIRED', 'Please select ' + fn)
    }
  }
  _val_Date(dat: Partial<ValidatorDate>) {
    return (
      control: AbstractControl
    ): Validation| null => {
      let b: Date = new Date(control?.value);
      let a;
      if (Custom.emptyCheck(b) && b instanceof Date)
        a = b?.getTime() ?? '';
      if (Custom.emptyCheck(b)) {
        if (
          dat?.currentDate != undefined &&
          a != dat?.currentDate?.getTime()
        )
          return MSG('DATE_CURRENT', 'Date must be equal current date')
        else if (
          b?.toDateString() == dat?.minDate?.toDateString() ||
          b?.toDateString() == dat?.maxDate?.toDateString()

        ) return null; // when case is >= | <=
        else if (dat?.minDate != undefined && dat?.minDate?.getTime() > a)
          return MSG('DATE_MIN', 'Date must be >= current date')
        else if (dat?.maxDate != undefined && dat?.maxDate?.getTime() < a) {
          return MSG('DATE_MAX', 'Date must be <= current date')
        }
        else return null;
      }
    };
  }

  // Stop Duplication of FormGroup in FormArray
  _arrayValidator(field1: string, field2: string) {
    return (
      array: FormArray
    ): {
      [key: string]: { key: string; message: string };
    } | null => {
      let msgDuplicate: Validation = MSG('Duplicate', 'Duplicate Selection Not Allowed')
      let repeat = 0;
      array?.controls?.forEach((group) => {
        let fieldA = group?.get(field1);
        let fieldB = group?.get(field2);
        array?.controls?.forEach((groups) => {
          let fielda = groups?.get(field1);
          let fieldb = groups?.get(field2);
          if (
            fieldA?.value == fielda?.value &&
            fieldB?.value == fieldb?.value
          ) {
            repeat++;
          }
          if (repeat > 1) {
            fieldA?.setErrors(msgDuplicate);
            fieldB?.setErrors(msgDuplicate);
            return msgDuplicate;
          } else if (fieldA?.value !== '' && fieldB?.value !== '') {
            fieldA?.setErrors(null);
            fieldB?.setErrors(null);
            return null;
          }
        });
        repeat = 0;
      });
      return null;
    };
  }
  // Can be used at Form Group Level (For Checking several properties at the sme time)
  _groupValidator(field1: string, field2: string, arrayName: string) {
    return (
      group: FormGroup
    ):
      Validation | null => {
      let msgDuplicate: Validation = MSG('Duplicate', 'Duplicate Selection Not Allowed')
      let fieldA = group?.get(field1);
      let fieldB = group?.get(field2);
      let result = this._fs._form?.get(arrayName)?.value;
      let repeat = 0;
      result?.forEach((item) => {
        if (item[field1] == fieldA.value && item[field2] == fieldB.value)
          repeat++;
      });
      if (repeat > 1) {
        fieldA.setErrors(msgDuplicate);
        fieldB.setErrors(msgDuplicate);
        return msgDuplicate;
      } else if (fieldA.value !== '' && fieldB.value !== '') {
        fieldA.setErrors(null);
        fieldB.setErrors(null);
        return null;
      } else if (fieldB.value !== '') {
        fieldB.setErrors(null);
        return null;
      } else if (fieldA.value !== '') {
        fieldB.setErrors(null);
        return null;
      }
    };
  }
  // Same as Group Validator
  _passwordMatchValidator(field1: string, field2: string) {
    return (
      group: FormGroup
    ): Validation | null => {
      let fieldA = group?.get(field1);
      let fieldB = group?.get(field2);

      if (fieldA !== null && fieldB !== null) {
        if (fieldB.value == '') {
          let message = {
            ERROR: {
              key: 'REQUIRED',
              message: 'Please Select Confirm Password',
            },
          };
          // fieldA.setErrors(message);
          fieldB.setErrors(message);
          return message;
        } else if (fieldA.value != fieldB.value) {
          let message = {
            ERROR: {
              key: 'MATCH',
              message: 'your passwords are not match',
            },
          };
          // fieldA.setErrors(message);
          fieldB.setErrors(message);
          return message;
        } else {
          // fieldA.setErrors(null);
          fieldB.setErrors(null);
          return null;
        }
      }
    };
  }
  // Loging the Form when form submitted.
  logForm(
    group: FormGroup | FormArray = this._fs._form,
    groupName = '_fs._form{}') {
    if(group.invalid){
      console.group(groupName)
      Object.keys(group.controls).forEach((key: string) => {
        const acc = group.get(key); // Abstract Control
        if (acc instanceof FormGroup ||
          acc instanceof FormArray) {
          let suffix = acc instanceof FormGroup ? '{}' : '[]'
          this.logForm(acc, key + suffix);
        } else if (acc instanceof FormControl) {
          if (
            acc.status == 'INVALID' ||
            acc.status == 'PENDING' // async Validators
          ) {
            console.error(this._error_control(acc));
          } else {
            // console.log(key + ' => ' + acc.value);
          }
        }
      });
      console.groupEnd();
    }

  }
}
const MSG = (key: string, message: string) => {
  return {
    ERROR :  { key, message }
  }
}
export interface ValidatorDate {
  currentDate: Date;
  minDate: Date; // No Need of it
  maxDate: Date; // No Need of it
  eDate: Date; // ==
  ltDate: Date; // <
  gtDate: Date; // >
  lteDate: Date; // <=
  gteDate: Date; // >=
}
export interface ValidatorParam {
  fn: string; // Field Name
  isField: number; // Text / Selection Option
  min: number;
  max: number;
  minChar: number;
  maxChar: number;
  num: number;
  alpha: number;
  alphaNum: number;
  specialChar: number;
  email: number;
  password: number;
}
export interface Validation {
  [key: string]: ValidationMessage
}
export interface ValidationMessage {
  key: string;
  message: string;
}

// type ComponentConfig = {
//   optionOne: string;
//   optionTwo: string;
//   optionThree: string;
// }
// export class SomeComponent {
//   private _defaultConfig: Partial<ComponentConfig> = {
//     optionOne: '...'
//   }
//   @Input() config: ComponentConfig;

//   ngOnInit() {
//     const merged = { ...this._defaultConfig, ...this.config };
//   }
// }
// interface UserModel {
//   email: string;
//   password: string;
//   address: string;
//   phone: string;
// }
// class User {
//   update( user: UserModel ) {
//     // Update user
//   }
// }
// class User {
//   update(  ) {
//     // Update user
//   }
// }
