import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpEditprofileComponent } from './mp-editprofile.component';

describe('MpEditprofileComponent', () => {
  let component: MpEditprofileComponent;
  let fixture: ComponentFixture<MpEditprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpEditprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpEditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
