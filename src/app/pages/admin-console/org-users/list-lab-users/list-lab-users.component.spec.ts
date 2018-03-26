import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLabUsersComponent } from './list-lab-users.component';

describe('ListLabUsersComponent', () => {
  let component: ListLabUsersComponent;
  let fixture: ComponentFixture<ListLabUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLabUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLabUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
