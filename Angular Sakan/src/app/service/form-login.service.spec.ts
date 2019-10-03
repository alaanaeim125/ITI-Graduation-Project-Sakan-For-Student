import { TestBed } from '@angular/core/testing';

import { FormLoginService } from './form-login.service';

describe('FormLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormLoginService = TestBed.get(FormLoginService);
    expect(service).toBeTruthy();
  });
});
