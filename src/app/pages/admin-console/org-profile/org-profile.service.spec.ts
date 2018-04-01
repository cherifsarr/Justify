import { TestBed, inject } from '@angular/core/testing';

import { OrgProfileService } from './org-profile.service';

describe('OrgProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrgProfileService]
    });
  });

  it('should be created', inject([OrgProfileService], (service: OrgProfileService) => {
    expect(service).toBeTruthy();
  }));
});
