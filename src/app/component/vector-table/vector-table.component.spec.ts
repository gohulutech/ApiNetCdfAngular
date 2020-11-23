import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorTableComponent } from './vector-table.component';

describe('VectorTableComponent', () => {
  let component: VectorTableComponent;
  let fixture: ComponentFixture<VectorTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VectorTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
