import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLabUserComponent } from './edit-lab-user.component';

describe('EditLabUserComponent', () => {
  let component: EditLabUserComponent;
  let fixture: ComponentFixture<EditLabUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLabUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLabUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
