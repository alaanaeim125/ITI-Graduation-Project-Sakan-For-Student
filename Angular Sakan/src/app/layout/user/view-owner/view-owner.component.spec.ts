import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOwnerComponent } from './view-owner.component';

describe('ViewOwnerComponent', () => {
  let component: ViewOwnerComponent;
  let fixture: ComponentFixture<ViewOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
