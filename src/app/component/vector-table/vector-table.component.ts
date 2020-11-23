import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-vector-table',
  templateUrl: './vector-table.component.html',
  styleUrls: ['./vector-table.component.scss']
})
export class VectorTableComponent implements OnInit {
  private _data = new MatTableDataSource<string>();
  private _datos : string[];
  private _variable : string;

  @ViewChild(MatPaginator) arrayPaginator: MatPaginator;

  @Input()
  set datos(val: any) {
    this._datos = val;
    this.data.data = this._datos;
    this.data.paginator = this.arrayPaginator;
    this.ref.detectChanges();
  }

  get data() : any {
    if (this.datos) {
      this._data = new MatTableDataSource(this.datos);
      this.data.paginator = this.arrayPaginator;
      this.ref.detectChanges();
    }

    return this._data;
  }

  @Input()
  set variable(val: string) {
    this._variable = val;
  }

  get variable() {
    return this._variable;
  }

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void { }
}