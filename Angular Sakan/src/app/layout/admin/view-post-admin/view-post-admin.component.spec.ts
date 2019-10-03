import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPostAdminComponent } from './view-post-admin.component';

describe('ViewPostAdminComponent', () => {
  let component: ViewPostAdminComponent;
  let fixture: ComponentFixture<ViewPostAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPostAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPostAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
