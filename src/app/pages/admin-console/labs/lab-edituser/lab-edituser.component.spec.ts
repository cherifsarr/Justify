import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabEdituserComponent } from './lab-edituser.component';

describe('LabEdituserComponent', () => {
  let component: LabEdituserComponent;
  let fixture: ComponentFixture<LabEdituserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabEdituserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabEdituserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
