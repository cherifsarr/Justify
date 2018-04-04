import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrgUserComponent } from './list-org-user.component';

describe('ListOrgUserComponent', () => {
  let component: ListOrgUserComponent;
  let fixture: ComponentFixture<ListOrgUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrgUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrgUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
