import { TestBed, inject } from '@angular/core/testing';

import { OrgUserService } from './org-user.service';

describe('OrgUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrgUserService]
    });
  });

  it('should be created', inject([OrgUserService], (service: OrgUserService) => {
    expect(service).toBeTruthy();
  }));
});
