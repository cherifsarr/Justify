import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpListusersComponent } from './mp-listusers.component';

describe('MpListusersComponent', () => {
  let component: MpListusersComponent;
  let fixture: ComponentFixture<MpListusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpListusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpListusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
