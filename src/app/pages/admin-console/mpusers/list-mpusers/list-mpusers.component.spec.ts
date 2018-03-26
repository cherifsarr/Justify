import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMpusersComponent } from './list-mpusers.component';

describe('ListMpusersComponent', () => {
  let component: ListMpusersComponent;
  let fixture: ComponentFixture<ListMpusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMpusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMpusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
