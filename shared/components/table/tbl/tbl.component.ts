import { AfterContentInit, Component, ContentChild, ContentChildren, Input, OnChanges,  QueryList, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatColumnDef, MatHeaderRowDef, MatRowDef, MatTable, MatTableDataSource } from '@angular/material/table';
import { BaseColumnComponent } from '../base-col.component';

@Component({
  selector: 'di-tbl',
  templateUrl: './tbl.component.html',
  styleUrls: ['./tbl.component.css']
})
export class TblComponent<T> implements OnChanges, AfterContentInit {
  constructor() { }

  @ContentChildren(BaseColumnComponent) dynColumns: QueryList<BaseColumnComponent<T>>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;

  @ContentChild(MatHeaderRowDef) headerRowDef: MatHeaderRowDef;
  @ContentChildren(MatRowDef) rowDefs: QueryList<MatRowDef<T>>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ContentChild(MatSort) sort: MatSort;

  @ViewChild(MatTable) table: MatTable<T>;

  @Input() _columns: any;
  @Input() data: any;
  public dataSource = new MatTableDataSource([]);
  ngOnChanges() {
    if (this.data) {
      this.setData(this.data);
    }
  }
  ngAfterContentInit() {
    // console.log(this.dynColumns, this.columnDefs);
    this.dynColumns.forEach(dynColumn => this.table.addColumnDef(dynColumn.columnDef));
    this.columnDefs.forEach(columnDef => this.table.addColumnDef(columnDef));

    // this.rowDefs.forEach(rowDef => this.table.addRowDef(rowDef));
    // this.table.addHeaderRowDef(this.headerRowDef);
  }

  setData(data) {
    if (Array.isArray(data)) {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

}
