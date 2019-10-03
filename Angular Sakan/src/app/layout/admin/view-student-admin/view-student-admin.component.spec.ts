import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudentAdminComponent } from './view-student-admin.component';

describe('ViewStudentAdminComponent', () => {
  let component: ViewStudentAdminComponent;
  let fixture: ComponentFixture<ViewStudentAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewStudentAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewStudentAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
