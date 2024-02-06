import { TestBed } from '@angular/core/testing';

import { TempsStoreService } from './temps-store.service';

describe('TempsStoreService', () => {
  let service: TempsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
