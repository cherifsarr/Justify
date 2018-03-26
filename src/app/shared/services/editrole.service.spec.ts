import { TestBed, inject } from '@angular/core/testing';

import { EditroleService } from './editrole.service';

describe('EditroleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditroleService]
    });
  });

  it('should be created', inject([EditroleService], (service: EditroleService) => {
    expect(service).toBeTruthy();
  }));
});
