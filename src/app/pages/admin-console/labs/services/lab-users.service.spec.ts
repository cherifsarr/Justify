import { TestBed, inject } from '@angular/core/testing';

import { LabUsersService } from './lab-users.service';

describe('LabUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabUsersService]
    });
  });

  it('should be created', inject([LabUsersService], (service: LabUsersService) => {
    expect(service).toBeTruthy();
  }));
});
