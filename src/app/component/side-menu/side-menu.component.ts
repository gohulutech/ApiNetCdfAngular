import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Metadata } from 'src/app/Models/metadata';
import { Variable } from 'src/app/Models/variable';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  private selectedFile : File;

  private _variables : Variable[];
  private _metadatos : Metadata[];

  @Input() 
  set Variables(variables : Variable[]) {
    this._variables = variables;
  }

  get Variables() {
    return this._variables;
  }

  @Input()
  set Metadatos(metadatos: Metadata[]) {
    this._metadatos = metadatos;
  }

  get Metadatos() {
    return this._metadatos;
  }

  @Output() archivoCargado = new EventEmitter<File>();
  @Output() variableSeleccionada = new EventEmitter<Variable>();

  constructor() { }

  ngOnInit(): void {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.archivoCargado.emit(this.selectedFile);
    document.getElementById("lblFile").innerHTML = this.selectedFile.name;
  }

  onVariableChanged(event) {
    this.variableSeleccionada.emit(event.value);
  }

}
