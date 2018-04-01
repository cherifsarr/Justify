import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorgComponent } from './editorg.component';

describe('EditorgComponent', () => {
  let component: EditorgComponent;
  let fixture: ComponentFixture<EditorgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
