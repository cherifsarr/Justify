import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabPreferencesComponent } from './lab-preferences.component';

describe('LabPreferencesComponent', () => {
  let component: LabPreferencesComponent;
  let fixture: ComponentFixture<LabPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabPreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
