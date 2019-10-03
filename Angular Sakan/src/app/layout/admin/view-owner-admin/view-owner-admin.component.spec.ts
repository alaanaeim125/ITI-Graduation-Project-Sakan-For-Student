import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOwnerAdminComponent } from './view-owner-admin.component';

describe('ViewOwnerAdminComponent', () => {
  let component: ViewOwnerAdminComponent;
  let fixture: ComponentFixture<ViewOwnerAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOwnerAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOwnerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
