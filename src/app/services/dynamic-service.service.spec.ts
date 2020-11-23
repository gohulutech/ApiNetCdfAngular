import { TestBed } from '@angular/core/testing';

import { DynamicServiceService } from './dynamic-service.service';

describe('DynamicServiceService', () => {
  let service: DynamicServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
