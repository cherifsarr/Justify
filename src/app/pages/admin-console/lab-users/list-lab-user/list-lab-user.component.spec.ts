import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLabUserComponent } from './list-lab-user.component';

describe('ListLabUserComponent', () => {
  let component: ListLabUserComponent;
  let fixture: ComponentFixture<ListLabUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLabUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLabUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
