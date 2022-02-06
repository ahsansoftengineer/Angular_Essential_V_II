import { HttpErrorResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { URLz } from '../enums/url.enum';
import { ImgType } from '../interface/common/img-type';
import { Cash } from '../model/transaction/cash.form';
import { BaseService } from './base.service';
import { FormService } from './form.service';

@Injectable({
  providedIn: 'root',
})
export class MethodService {
  _service: BaseService
  _fs: FormService
  constructor(injector: Injector) {
    this._service = injector.get(BaseService)
    this._fs = injector.get(FormService)
  }
  public handleError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }
  public statusEmmit: EventEmitter<any> = new EventEmitter();
  public async FormLeave(
    title: string,
    text: string
  ) {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#cfcfcf',
      confirmButtonColor: '#3085d6',
      cancelButtonText: '<i class="fas fa-times"></i>',
      confirmButtonText: '<i class="fas fa-thumbs-up"></i>',
      reverseButtons:true
    }).then((result) => {
      return result
    });
  }
  public async SwalFireCancel(
    service: BaseService,
    item: Cash
  ) {
    return Swal.fire({
      title: 'Are you sure?',
      text:  'Record will be cancel!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#cfcfcf',
      confirmButtonColor: '#3085d6',
      cancelButtonText: '<i class="fas fa-times"></i>',
      confirmButtonText: '<i class="fas fa-thumbs-up"></i>',
      reverseButtons:true
    }).then((result) => {
      if (result.isConfirmed) {
        service.cancel(
          'code='+item.code + '&row_id='+item.row_id,
          null,
          environment.TRANSACTION + URLz.TRANSACTION
          ).subscribe((response: any) => {
          this.statusEmmit.emit('done');
          Swal.fire(
            'Entry Cancel!',
            'Record cancel successfully',
            'success'
          );
        });
      } else {
        this.statusEmmit.emit('not deleted');
      }
    });
  }
  public async SwalFireDelete(
    service: any,
    class_name: string,
    id: number
  ) {
    return Swal.fire({
      title: 'Are you sure?',
      text:  'Record will be deleted!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#cfcfcf',
      confirmButtonColor: '#3085d6',
      cancelButtonText: '<i class="fas fa-times"></i>',
      confirmButtonText: '<i class="fas fa-thumbs-up"></i>',
      reverseButtons:true
    }).then((result) => {
      if (result.isConfirmed) {
        service.delete(id).subscribe((response: any) => {
          this.statusEmmit.emit('done');
          Swal.fire(
            'Deleted!',
            'Record deleted successfully',
            'success'
          );
        });
      } else {
        this.statusEmmit.emit('not deleted');
      }
    });
  }
  public async SwalFireStatusChange(
    service: any,
    status: any,
    class_name: string = 'Class'
  ) {
    let statuss = status.activate == 0 ? false : true;
    Swal.fire({
      title: 'Are you sure?',
      text:  'Record will be ' + (statuss ? 'activated' : 'de-activated'),
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#cfcfcf',
      confirmButtonColor: '#3085d6',
      cancelButtonText: '<i class="fas fa-times"></i>',
      confirmButtonText: '<i class="fas fa-thumbs-up"></i>',
      reverseButtons:true
    }).then((result) => {
      if (result.isConfirmed) {
        service.status(status).subscribe((res: any) => {
          // Swal.fire(
          //   status.activate ? 'Activated!' : 'De-activated!',
          //   res.message
          // );
          Swal.fire({
            title: status.activate ? 'activated' : 'de-activated',
            text:  res.message,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: '<i class="fas fa-thumbs-up"></i>',
          });
          this.statusEmmit.emit('done');
        });
      } else {
        this.statusEmmit.emit(status);
      }
    });
  }

  public async  SwalWajibaAndNafila(Type : any , amount : any){
    Swal.fire({
      title: `you have entered incorrect ${amount} ${Type} total`,
      text: "",
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: '<i class="fas fa-thumbs-up"></i>',
    })
  }

  public async  genericSwal(text : any = '' , icon : any = '' , title : any = ''){
    Swal.fire({
      title:title,
      text: text,
      icon: icon,
      confirmButtonColor: '#3085d6',
      confirmButtonText: '<i class="fas fa-thumbs-up"></i>',
    })
  }

  public jsontoFormData(
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
  public objToURLQuery(searchObject: any) {
    // For Simple Object Only
    let result = '';
    for (var key of Object.keys(searchObject)) {
      if (searchObject[key] == null && searchObject[key] == ''){}
      else
        result += '&' + key + '=' + searchObject[key];
    }
    return result;
  }
  private isArray(val) {
    const toString = {}.toString;
    return toString.call(val) === '[object Array]';
  }
  private isObject(val) {
    return !this.isArray(val) && typeof val === 'object' && !!val;
  }

  public UndateObject(items,item){
    items.forEach((element, index) => {
      if(element.id === item.id) {
          items[index] = item;
      }
    });
    return items;
  }
  public loadSubEntity(entity: URLz, code, org_code, sys_code, __ddl) {
    if (code?.source?.value) code = code?.source?.value;
    if (entity == URLz.BG) {
      this._dropdown(entity, code, org_code, sys_code).subscribe(
        (res) => (__ddl.bg = res.data.records)
      );
      __ddl.le = [];
      __ddl.ou = [];
    }
    if (entity == URLz.LE) {
      this._dropdown(entity, code, org_code, sys_code).subscribe(
        (res) => (__ddl.le = res.data.records)
      );
      __ddl.ou = [];
      __ddl.su = [];
    } else if (entity == URLz.OU) {
      this._dropdown(entity, code, org_code, sys_code).subscribe(
        (res) => (__ddl.ou = res.data.records)
      );
      __ddl.su = [];
    } else if (entity == URLz.SU) {
      this._dropdown(entity, code, org_code, sys_code).subscribe(
        (res) => {
          __ddl.su = res.data.records
        }
      );
    } else if (entity == URLz.STATE) {
      this._dropdown(entity, code, org_code, sys_code).subscribe(
        (res) => (__ddl.state_id = res.data.records)
      );
      __ddl.city_id = [];
    } else if (entity == URLz.CITY) {
      this._dropdown(entity, code, org_code, sys_code).subscribe(
        (res) => (__ddl.city_id = res.data.records)
      );
    }else if (entity == URLz.BASTA_SUB_CAT) {
      this._dropdown(entity, code, org_code, sys_code).subscribe(
        (res) => {
         __ddl.basta_subcategory_id = res.data.records;
        }
      );
    }
    else if (entity == URLz.ORG_SYSTEM) {
      this._dropdown(entity, code, org_code, sys_code).subscribe((res) => {
        __ddl.system_id = res.data.records;
      });
    }
    // else if (entity == URLz.ORG_SYSTEM) {
    //   this._dropdown(entity, code, org_code, sys_code).subscribe((res) => {
    //     __ddl.system_id = res.data.records;
    //   });
    // }
    else if (entity == URLz.DONATION_T) {
      this._dropdown(entity, code, org_code, sys_code).subscribe((res) => {
        __ddl.donation_type_id = res.data.records;
      });
    } else if (entity == URLz.DCO) {
      this._dropdown(entity, code, org_code, sys_code).subscribe((res) => {
        __ddl.dco = res.data.records;
      });
    }
  }
  public _dropdown(url: URLz, code, org_code, sys_code) {
    return this._service.selectOptionService(url, code , org_code, sys_code);
  }
  public _custom_dropdown(url: URLz, code='') {
    return this._service.getdata(url, code);
  }
  public imageSelector(event: any, imgType: ImgType) {
    if (event.target.files.length === 0) {
      imgType.link = ''
      imgType.display
      return
    };
    const file: File = event.target.files[0];
    const name = file.name
    imgType.error = '';
    const ext = name.substring(name.lastIndexOf('.') + 1, file.name.length)
    if ('jpeg jpg png jfif'.indexOf(ext.toLowerCase()) < 1) {
      imgType.error = 'type';
      imgType.link = ''
    }
    if(file.size > 2000000) {
      imgType.error = 'size'
      imgType.link = ''
    }
    if(imgType.error == ''){
      imgType.size = file.size
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        imgType.link = _event.target.result;
        imgType.file = event.srcElement.files[0];
        imgType.name = event.srcElement.files[0].name;
      }
    }
  }
}
