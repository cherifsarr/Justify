import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpEditusersComponent } from './mp-editusers.component';

describe('MpEditusersComponent', () => {
  let component: MpEditusersComponent;
  let fixture: ComponentFixture<MpEditusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpEditusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpEditusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
