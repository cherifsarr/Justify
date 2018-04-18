import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabListusersComponent } from './lab-listusers.component';

describe('LabListusersComponent', () => {
  let component: LabListusersComponent;
  let fixture: ComponentFixture<LabListusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabListusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabListusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
