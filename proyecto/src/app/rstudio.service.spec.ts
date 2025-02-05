import { TestBed } from '@angular/core/testing';

import { RstudioService } from './rstudio.service';

describe('RstudioService', () => {
  let service: RstudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RstudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
