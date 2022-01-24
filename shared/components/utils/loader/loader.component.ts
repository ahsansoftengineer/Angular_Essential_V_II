import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { StateService } from 'src/app/service/state.service';

@Component({
  selector: 'di-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  loading: boolean;
  constructor(private _ss: StateService, private spinner: NgxSpinnerService) {
    this._ss.isLoading.subscribe(x => {
      this.loading = x
    })
  }
  ngOnInit(): void {
  }

}
