import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListrolesComponent } from './listroles.component';

describe('ListrolesComponent', () => {
  let component: ListrolesComponent;
  let fixture: ComponentFixture<ListrolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListrolesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListrolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
