import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as Highcharts from 'highcharts';
declare var require: any;
//let Boost = require('highcharts/modules/boost');
let threeD = require('highcharts/highcharts-3d');

threeD(Highcharts);
//Boost(Highcharts);

@Component({
  selector: 'app-array-table',
  templateUrl: './array-table.component.html',
  styleUrls: ['./array-table.component.scss']
})
export class ArrayTableComponent implements OnInit {
  public graph;

  private _data = new MatTableDataSource<string[]>();
  private _datos : string[];
  private _variable : string;

  displayedColumns: string[];

  @ViewChild(MatPaginator) arrayPaginator: MatPaginator;

  @Input()
  set datos(val: any) {
    var values = val.map(v => v.map(v2 => Number(v2)));
    this.graph = {
      data: [{ z: values, type: 'surface' }],
      layout: {autosize: true, title: 'Datos'},
    };
    this._datos = val;
  }

  get data() : any {
    return this._data;
  }

  @Input()
  set variable(val: string) {
    this._variable = val;
  }

  get variable() {
    return this._variable;
  }

  constructor(private ref: ChangeDetectorRef) { 
  }

  ngOnInit(): void {
  }
}