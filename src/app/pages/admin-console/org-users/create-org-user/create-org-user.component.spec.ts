import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrgUserComponent } from './create-org-user.component';

describe('CreateOrgUserComponent', () => {
  let component: CreateOrgUserComponent;
  let fixture: ComponentFixture<CreateOrgUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrgUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrgUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
