import { Component, Injector, OnInit } from '@angular/core';
import { BaseControlACComponent } from '../../control/base-control-ac.component';

@Component({
  selector: 'di-tbl-ac',
  templateUrl: './tbl-ac.component.html',
  styleUrls: ['./tbl-ac.component.css']
})
export class TblACComponent extends BaseControlACComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit(): void {
    super.ngOnInit();
    this.searchControl.valueChanges.subscribe(x => {
      if(x ==='' || x === null || x === undefined){
        this.control.patchValue(null)
      }
    })
  }
  setFormValue(item: {id: string, title: string}){
    this.control.patchValue(item.id)
  }
}
