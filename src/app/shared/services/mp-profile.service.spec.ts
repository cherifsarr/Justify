import { TestBed, inject } from '@angular/core/testing';

import { MPProfileService } from './mp-profile.service';

describe('MpProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MPProfileService]
    });
  });

  it('should be created', inject([MPProfileService], (service: MPProfileService) => {
    expect(service).toBeTruthy();
  }));
});
