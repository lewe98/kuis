import { TestBed } from '@angular/core/testing';

import { ModulService } from './modul.service';

describe('ModulService', () => {
  let service: ModulService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModulService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
