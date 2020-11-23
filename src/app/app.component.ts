import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ApiNetCdfService } from './services/api-net-cdf.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ArrayTableComponent } from './component/array-table/array-table.component';
import { VectorTableComponent } from './component/vector-table/vector-table.component';
import { EscalarVariableComponent } from './component/escalar-variable/escalar-variable.component';
import { SideMenuComponent } from './component/side-menu/side-menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ApiNetCdf';
  selectedFile : File;
  disableSelect = new FormControl(false);
  TipoDatoArreglo : boolean = false;
  TipoDatoEscalar : boolean = false;
  TipoDatoVector : boolean = false;

  @ViewChild(MatPaginator) arrayPaginator: MatPaginator;
  @ViewChild('arrayTable') arrayTable : ArrayTableComponent;
  @ViewChild('vectorTable') vectorTable : VectorTableComponent;
  @ViewChild('escalarVariable') escalarVariable : EscalarVariableComponent;
  @ViewChild('sidemenu') sidemenu : SideMenuComponent;

  constructor(
    private apiNetCdfService : ApiNetCdfService
    , private _snackBar: MatSnackBar
    , private ref: ChangeDetectorRef) { }

  private GetVariables() {
    this.apiNetCdfService.GetVariables().subscribe(v => {
      this.sidemenu.Variables = v;
    });
  }

  onFileChanged(event) {
    this.sidemenu.Variables = [];
    this.sidemenu.Metadatos = [];

    this.selectedFile = event;

    this.apiNetCdfService.Upload(this.selectedFile).subscribe(r => {
      if (r.Success) {
        this._snackBar.open(r.data.toString(), "Success", { duration: 2000 });
        this.GetVariables();
      }
    });
  }

  onVariableChanged(event) {
    this.apiNetCdfService.GetMetadata(event.Id).subscribe(m => { this.sidemenu.Metadatos = m; });

    this.apiNetCdfService.GetData(event.Id).subscribe(d => {
      this._snackBar.open("Cargando datos...", "Success", { duration: 2000 });
      this.EstablecerTipoDatosEnFalso();
      if (d.Success && (d.TipoDato == "Arreglo")) {
        this.TipoDatoArreglo = true;
        this.arrayTable.datos = <[]>d.data;
        this.arrayTable.variable = event.Value;
      } else if (d.Success && (d.TipoDato == "Vector")) {
        this.TipoDatoVector = true;
        this.vectorTable.datos = d.data;
        this.vectorTable.variable = event.Value;
      } else if (d.Success && (d.TipoDato == "Escalar")) {
        this.TipoDatoEscalar = true;
        this.escalarVariable.valor = d.data;
        this.escalarVariable.variable = event.Value;
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
