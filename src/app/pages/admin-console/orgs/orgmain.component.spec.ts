import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgmainComponent } from './orgmain.component';

describe('OrgmainComponent', () => {
  let component: OrgmainComponent;
  let fixture: ComponentFixture<OrgmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
