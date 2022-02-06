import { EventEmitter } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { URLz } from '../enums/url.enum';
import { BaseService } from '../service/base.service';
import { Cash } from '../model/transaction/cash.form';
import { environment } from 'src/environments/environment';
import { TRANS } from '../model/transaction/enum';
import { HTTPService } from '../service/http.service';
// Custom Class Should be abstract and has all Static Methods
export abstract class Custom {
  public static statusEmmit: EventEmitter<any> = new EventEmitter();
  public static mergeSwalFire(passedSettings: SweetAlertOptions) : SweetAlertOptions{
    return {
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#cfcfcf',
      confirmButtonColor: '#3085d6',
      cancelButtonText: '<i class="fas fa-times"></i>',
      confirmButtonText: '<i class="fas fa-thumbs-up"></i>',
      reverseButtons: true,
      ...passedSettings
    }
  }
  public static  FormLeave(
    title: string,
    text: string
  ) {
    return Swal.fire({
      ...this.mergeSwalFire({title, text})
    }).then((result) => {
      return result
    });
  }
  public static  SwalFireCancel(
    service: HTTPService,
    item: Cash,
    transType: TRANS
  ) {
    return Swal.fire({
        ...this.mergeSwalFire({
        title: 'Are you sure?',
        text: 'Record will be cancel!'
      })
    }).then((result) => {
        if (result.isConfirmed) {
          service.modify({
            paramObj: {
              code: item.code,
              row_id: item.row_id,
              receipt_type: transType
            },
            url: environment.TRANSACTION,
            endpoint: URLz.TRANSACTION
          }).subscribe((response: any) => {
            Custom.statusEmmit.emit('done');
            Swal.fire(
              'Entry Cancel!',
              'Record cancel successfully',
              'success'
            );
          });
        } else {
          Custom.statusEmmit.emit('not deleted');
        }
      });
  }
  public static  SwalFireDelete(
    service: BaseService,
    class_name: string,
    id: number
  ) {
    return Swal.fire({
      ...this.mergeSwalFire({
        title: 'Are you sure?',
        text: 'Record will be deleted!'})
      }).then((result) => {
      if (result.isConfirmed) {
        service.delete(id).subscribe((response: any) => {
          Swal.fire(
            'Deleted!',
            'Record deleted successfully',
            'success'
          ).then(() => {
            Custom.statusEmmit.emit('done');
          });
        });
      } else {
        Custom.statusEmmit.emit('not deleted');
      }
    });
  }
  public static jsontoFormData(
    jo: Object, // Json Object
    pk = '', // Parent Key
    carryFormData: FormData
  ): FormData {
    const formData = carryFormData || new FormData();
    let index = 0;

    for (var key in jo) {
      if (jo.hasOwnProperty(key)) {
        if (jo[key] !== null && jo[key] !== undefined) {
          var propName = pk || key;
          if (pk && this.isObject(jo)) {
            propName = pk + '[' + key + ']';
          }
          if (pk && this.isArray(jo)) {
            propName = pk + '[' + index + ']';
          }
          if (jo[key] instanceof File) {
            formData.append(propName, jo[key]);
          } else if (jo[key] instanceof FileList) {
            for (var j = 0; j < jo[key].length; j++) {
              formData.append(propName + '[' + j + ']', jo[key].item(j));
            }
          } else if (this.isArray(jo[key]) || this.isObject(jo[key])) {
            this.jsontoFormData(jo[key], propName, formData);
          } else if (typeof jo[key] === 'boolean') {
            formData.append(propName, +jo[key] ? '1' : '0');
          } else {
            formData.append(propName, jo[key]);
          }
        }
      }
      index++;
    }
    return formData;
  }
  private static isArray(val) {
    const toString = {}.toString;
    return toString.call(val) === '[object Array]';
  }
  private static isObject(val) {
    return !this.isArray(val) && typeof val === 'object' && !!val;
  }
  public static emptyCheck(val: any) {
    return val != undefined && val != null && val != '';
  }
}

