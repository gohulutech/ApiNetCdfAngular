import { TestBed } from '@angular/core/testing';

import { ApiNetCdfService } from './api-net-cdf.service';

describe('ApiNetCdfService', () => {
  let service: ApiNetCdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiNetCdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
