import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMpuserComponent } from './edit-mpuser.component';

describe('EditMpuserComponent', () => {
  let component: EditMpuserComponent;
  let fixture: ComponentFixture<EditMpuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMpuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMpuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
