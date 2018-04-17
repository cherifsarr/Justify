import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabEditprofileComponent } from './lab-editprofile.component';

describe('LabEditprofileComponent', () => {
  let component: LabEditprofileComponent;
  let fixture: ComponentFixture<LabEditprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabEditprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabEditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
