import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ApiNetCdfService } from './services/api-net-cdf.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Variable } from './Models/variable';
import { Metadata } from './Models/metadata';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ArrayTableComponent } from './component/array-table/array-table.component';
import { VectorTableComponent } from './component/vector-table/vector-table.component';
import { EscalarVariableComponent } from './component/escalar-variable/escalar-variable.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ApiNetCdf';
  selectedFile : File;
  disableSelect = new FormControl(false);
  Variables : Variable[];
  Metadatos : Metadata[];
  TipoDatoArreglo : boolean = false;
  TipoDatoEscalar : boolean = false;
  TipoDatoVector : boolean = false;

  displayedColumns: string[];
  data : MatTableDataSource<string[]> = new MatTableDataSource();
  valor : any;

  datos : string[] = [];

  @ViewChild(MatPaginator) arrayPaginator: MatPaginator;
  @ViewChild('arrayTable') arrayTable : ArrayTableComponent;
  @ViewChild('vectorTable') vectorTable : VectorTableComponent;
  @ViewChild('escalarVariable') escalarVariable : EscalarVariableComponent;

  constructor(
    private apiNetCdfService : ApiNetCdfService
    , private _snackBar: MatSnackBar
    , private ref: ChangeDetectorRef) { }

  private GetVariables() {
    this.apiNetCdfService.GetVariables().subscribe(v => {
      this.Variables = v;
    });
  }

  onFileChanged(event) {
    this.Variables = [];
    this.Metadatos = [];

    event.preventDefault();
    this.selectedFile = event.target.files[0];
    document.getElementById("lblFile").innerHTML = this.selectedFile.name;

    this.apiNetCdfService.Upload(this.selectedFile).subscribe(r => {
      if (r.Success) {
        this._snackBar.open(r.data.toString(), "Success", { duration: 2000 });
        this.GetVariables();
      }
    });
  }

  onVariableChanged(event) {
    this.apiNetCdfService.GetMetadata(event.value.Id).subscribe(m => { this.Metadatos = m; });

    this.apiNetCdfService.GetData(event.value.Id).subscribe(d => {
      this._snackBar.open("Cargando datos...", "Success", { duration: 2000 });
      this.EstablecerTipoDatosEnFalso();
      if (d.Success && (d.TipoDato == "Arreglo")) {
        this.TipoDatoArreglo = true;
        this.arrayTable.datos = <[]>d.data;
        this.arrayTable.variable = event.value.Value;
      } else if (d.Success && (d.TipoDato == "Vector")) {
        this.TipoDatoVector = true;
        this.vectorTable.datos = d.data;
        this.vectorTable.variable = event.value.Value;
      } else if (d.Success && (d.TipoDato == "Escalar")) {
        this.TipoDatoEscalar = true;
        this.escalarVariable.valor = d.data;
        this.escalarVariable.variable = event.value.Value;
      }
      this.ref.detectChanges();
    })
  }

  private EstablecerTipoDatosEnFalso() {
    this.TipoDatoArreglo = false;
    this.TipoDatoEscalar = false;
    this.TipoDatoVector = false;
  }
}
