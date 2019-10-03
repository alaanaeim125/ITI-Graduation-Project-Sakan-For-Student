import { TestBed } from '@angular/core/testing';

import { FormRegisterService } from './form-register.service';

describe('FormRegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormRegisterService = TestBed.get(FormRegisterService);
    expect(service).toBeTruthy();
  });
});
