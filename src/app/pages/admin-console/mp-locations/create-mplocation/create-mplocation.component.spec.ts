import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMplocationComponent } from './create-mplocation.component';

describe('CreateMplocationComponent', () => {
  let component: CreateMplocationComponent;
  let fixture: ComponentFixture<CreateMplocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMplocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMplocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
