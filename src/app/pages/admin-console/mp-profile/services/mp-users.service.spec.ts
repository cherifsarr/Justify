import { TestBed, inject } from '@angular/core/testing';

import { MpUsersService } from './mp-users.service';

describe('MpUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MpUsersService]
    });
  });

  it('should be created', inject([MpUsersService], (service: MpUsersService) => {
    expect(service).toBeTruthy();
  }));
});
