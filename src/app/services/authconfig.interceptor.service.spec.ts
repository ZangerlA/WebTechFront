import { TestBed } from '@angular/core/testing';

import { Authconfig.InterceptorService } from './authconfig.interceptor.service';

describe('Authconfig.InterceptorService', () => {
  let service: Authconfig.InterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Authconfig.InterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
