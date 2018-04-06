import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpEditlocationComponent } from './mp-editlocation.component';

describe('MpEditlocationComponent', () => {
  let component: MpEditlocationComponent;
  let fixture: ComponentFixture<MpEditlocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpEditlocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpEditlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
