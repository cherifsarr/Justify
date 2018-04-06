import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MpListlocationComponent } from './mp-listlocation.component';

describe('MpListlocationComponent', () => {
  let component: MpListlocationComponent;
  let fixture: ComponentFixture<MpListlocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MpListlocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MpListlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
