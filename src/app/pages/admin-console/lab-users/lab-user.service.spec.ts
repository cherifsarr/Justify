import { TestBed, inject } from '@angular/core/testing';

import { LabUserService } from './lab-user.service';

describe('LabUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabUserService]
    });
  });

  it('should be created', inject([LabUserService], (service: LabUserService) => {
    expect(service).toBeTruthy();
  }));
});
