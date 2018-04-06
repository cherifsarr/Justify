import { TestBed, inject } from '@angular/core/testing';

import { LabProfileService } from './lab-profile.service';

describe('LabProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabProfileService]
    });
  });

  it('should be created', inject([LabProfileService], (service: LabProfileService) => {
    expect(service).toBeTruthy();
  }));
});
