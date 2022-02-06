import { Component, Inject, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseForm } from 'src/app/class/base.form';
import { ChangeEvent } from 'src/app/interface/common/change-event';
import { Hierarchy } from 'src/app/interface/common/hierarchy';

@Component({
  selector: 'app-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.css'],
  host: { class: 'col-lg-6 col-sm-12 p-0' }
})
export class TransactionDialogComponent extends BaseForm {
  systemSubscription: any;
  _data : any = {
    orgId : '',
    sysId : ''
  }
  constructor(
    public dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    injector: Injector
  ) {
    super(injector);
    dialogRef.disableClose = true;
  }
  getData(e:ChangeEvent){
    if(e?.event?.isUserInput){
      if(e.who == "organisation_id"){
        this._data.orgId  = e?.id;
      }
      if(e.who == "system_id"){
        this._data.sysId  = e?.id;
      }
    }
  }
  _close(): void {
    this.dialogRef.close({ data: this._data});
  }
  patchingHierarchy(){
    if(this._ss.transHierarchySaveDefault){
      let hierarchy: Hierarchy = this._fs._form.get('hierarchy').value
      this._ss.hierarchy.organisation_id = hierarchy.organisation_id
      this._ss.hierarchy.system_id = hierarchy.system_id
      this._ss.hierarchy.bg = hierarchy.bg
      this._ss.hierarchy.le = hierarchy.le
      this._ss.hierarchy.ou = hierarchy.ou
      this._ss.hierarchy.su = hierarchy.su
      if(hierarchy.dco){
        this._ss.hierarchy.dco = hierarchy.dco;
      }
      localStorage.setItem('transHierarchySaveDefault', btoa(JSON.stringify(hierarchy)));
    }else {
      localStorage.removeItem('transHierarchySaveDefault')
    }
  }
  getHierarchy(): FormGroup {
    return this._fs._form.get('hierarchy') as FormGroup;
  }
  _disabledButton() {
    let group = this._fs._form.get('hierarchy') as FormGroup;
    return group.invalid;
  }
  applyClass = { 'col-lg-3': false, 'col-md-4': false, 'col-md-12': true };
  applyDate = { 'col-lg-3': false, 'col-md-4': false, 'col-md-6': true };
}
