import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabUsersComponent } from './lab-users.component';

describe('LabUsersComponent', () => {
  let component: LabUsersComponent;
  let fixture: ComponentFixture<LabUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
