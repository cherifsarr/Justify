import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsNavComponent } from './labs-nav.component';

describe('LabsNavComponent', () => {
  let component: LabsNavComponent;
  let fixture: ComponentFixture<LabsNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabsNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
