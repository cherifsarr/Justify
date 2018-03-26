import { TestBed, inject } from '@angular/core/testing';

import { MpuserService } from './mpuser.service';

describe('MpuserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MpuserService]
    });
  });

  it('should be created', inject([MpuserService], (service: MpuserService) => {
    expect(service).toBeTruthy();
  }));
});
