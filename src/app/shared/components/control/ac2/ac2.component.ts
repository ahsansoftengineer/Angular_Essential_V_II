import { Component, Injector, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of, scan } from 'rxjs';
import { SelectOption } from 'src/app/interface/common/select';
import { BaseControlComponent } from '../base-control.component';

@Component({
  selector: 'di-ac-ii',
  templateUrl: './ac2.component.html',
  styleUrls: ['./ac2.component.css']
})
export class Ac2Component extends BaseControlComponent implements OnInit {
  total = 1000;
  data = Array.from({length: this.total}).map((_, i) => `Option ${i}`);
  filteredData = [];
  limit = 10;
  offset = 0;
  options = new BehaviorSubject<SelectOption[]>([]);
  tempList: Observable<SelectOption[]>;

  searchControl: FormControl = new FormControl()

  constructor(injector: Injector) {
    super(injector)
    
  }

  ngOnInit() {
    this.filteredData=this.data;
    this.getNextBatch();
    // this.ctrl.valueChanges.subscribe((val) => {
    //   console.log(val);
    //   this.ctrl.setValue(val, {emitEvent:false});
    // })

    this.searchControl.valueChanges.subscribe((val) => {
        this.offset = 0;
        this.tempList = of([]);
        this.options.next(null);
        //debugger;
         if (!val) {
            this.filteredData = this.data;
          } else {
            this.filteredData = this.data.filter((i) => {
            return i.toLowerCase().indexOf(val.toLowerCase()) > -1
            });
          }
          this.offset = 0;
          this.getNextBatch();
    });
   /* 
      this.options.subscribe(val => {
      console.log("options = " + val);

      if(!val){
        this.options$ =  of(['']);
      }
    })*/

  }

  listToListSubscritpion(){
    this.tempList = this.options.asObservable().pipe(
      scan((acc, curr) => {
       //console.log(null);
       if(curr === null){
         return [];
       }
        return [...acc, ...curr];
      }, [])
    );
  }
  hitAPI(){
    
  }
  getNextBatch() {
    const result = this.filteredData.slice(this.offset, this.offset + this.limit);
    console.log(result);
    this.options.next(result);
    this.offset += this.limit;
  }
}
