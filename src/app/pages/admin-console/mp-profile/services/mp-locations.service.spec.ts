import { TestBed, inject } from '@angular/core/testing';

import { MpLocationsService } from './mp-locations.service';

describe('MpLocationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MpLocationsService]
    });
  });

  it('should be created', inject([MpLocationsService], (service: MpLocationsService) => {
    expect(service).toBeTruthy();
  }));
});
