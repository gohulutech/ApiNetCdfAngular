import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-array-table',
  templateUrl: './array-table.component.html',
  styleUrls: ['./array-table.component.scss']
})
export class ArrayTableComponent implements OnInit {
  private _data = new MatTableDataSource<string[]>();
  private _datos : string[];
  displayedColumns: string[];

  @ViewChild(MatPaginator) arrayPaginator: MatPaginator;

  @Input()
  set datos(val: any) {
    this._datos = val;
    this.displayedColumns = (val).map((d, index) => { return `Col ${index}`; });
    this.data.data = this._datos;
    this.data.paginator = this.arrayPaginator;
    this.ref.detectChanges();
  }

  get data() : any {
    if (this.datos) {
      this._data = new MatTableDataSource(this.datos);
      this.displayedColumns = (this.datos).map((d, index) => { return `Col ${index}`; });
      this.data.paginator = this.arrayPaginator;
      this.ref.detectChanges();
    }

    return this._data;
  }

  constructor(private ref: ChangeDetectorRef) { 
    var pp = "ss";
  }

  ngOnInit(): void {
    var pp ="ss";
  }

}
