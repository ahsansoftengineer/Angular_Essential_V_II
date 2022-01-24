import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { DI_Table } from 'src/app/interface/common/di-table';
import { Custom } from 'src/app/static/custom';

@Component({
  selector: 'di-paginator',
  templateUrl: './di-paginator.component.html',
  styleUrls: ['./di-paginator.component.css']
})
export class DiPaginatorComponent implements OnInit {

  constructor() { }
  @Input() tbl: DI_Table;
  @Output('paginateEvent') paginateEvents = new EventEmitter<DI_Table>();
  ngOnInit(): void {
  }
  _paginate(event?: PageEvent): PageEvent {
    this.tbl.index = event.pageIndex;
    this.tbl.length = event.length;
    this.tbl.size = event.pageSize;
    this.tbl.prevIndex = event.previousPageIndex;
    this.paginateEvents.emit(this.tbl)
    return event;
  }
}
