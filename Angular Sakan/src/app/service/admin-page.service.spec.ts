import { TestBed } from '@angular/core/testing';

import { AdminPageService } from './admin-page.service';

describe('AdminPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminPageService = TestBed.get(AdminPageService);
    expect(service).toBeTruthy();
  });
});
