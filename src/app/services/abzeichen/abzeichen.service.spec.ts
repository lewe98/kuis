import { TestBed } from '@angular/core/testing';

import { AbzeichenService } from './abzeichen.service';

describe('AbzeichenService', () => {
  let service: AbzeichenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbzeichenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
