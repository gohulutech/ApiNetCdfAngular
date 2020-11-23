import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalarVariableComponent } from './escalar-variable.component';

describe('EscalarVariableComponent', () => {
  let component: EscalarVariableComponent;
  let fixture: ComponentFixture<EscalarVariableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscalarVariableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscalarVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
