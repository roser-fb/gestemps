import { TestBed } from '@angular/core/testing';

import { FitxarService } from './fitxar.service';

describe('FitxarService', () => {
  let service: FitxarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FitxarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
