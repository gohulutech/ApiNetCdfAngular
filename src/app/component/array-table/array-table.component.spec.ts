import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayTableComponent } from './array-table.component';

describe('ArrayTableComponent', () => {
  let component: ArrayTableComponent;
  let fixture: ComponentFixture<ArrayTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrayTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
