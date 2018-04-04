import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpLocationsComponent } from './mp-locations.component';

describe('MpLocationsComponent', () => {
  let component: MpLocationsComponent;
  let fixture: ComponentFixture<MpLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
