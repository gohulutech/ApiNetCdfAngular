import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-vector-table',
  templateUrl: './vector-table.component.html',
  styleUrls: ['./vector-table.component.scss']
})
export class VectorTableComponent implements OnInit {
  private _data = new MatTableDataSource<string>();
  private _variable : string;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options; 

  @ViewChild(MatPaginator) arrayPaginator: MatPaginator;

  @Input()
  set datos(val: any) {
    var values = val.map(v =>  parseFloat(v.replace(/,/g , "__COMMA__")
        .replace(/\./g, ',')
        .replace(/__COMMA__/g, '.')));
    this.chartOptions = {
      series: [{
        data: values,
        type: 'line'
      }]
    };
  }

  get data() : any {
    return this._data;
  }

  @Input()
  set variable(val: string) {
    this._variable = val;
    this.chartOptions.title = {
      text: `Datos ${val}`
    };
    this.chartOptions.xAxis = {
      title: {
        text: `${val}`
      } 
    };
  }

  get variable() {
    return this._variable;
  }

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void { }
}