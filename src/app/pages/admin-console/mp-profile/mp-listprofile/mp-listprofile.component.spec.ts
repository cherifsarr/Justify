import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpListprofileComponent } from './mp-listprofile.component';

describe('MpListprofileComponent', () => {
  let component: MpListprofileComponent;
  let fixture: ComponentFixture<MpListprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpListprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpListprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
