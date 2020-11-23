import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-escalar-variable',
  templateUrl: './escalar-variable.component.html',
  styleUrls: ['./escalar-variable.component.scss']
})
export class EscalarVariableComponent implements OnInit {
  private _valor : string;

  @Input()
  set valor(val: any) {
    this._valor = val;
  }

  get valor() {
    return this._valor;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
