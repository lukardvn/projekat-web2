import { TestBed } from '@angular/core/testing';

import { AnonymousGuard } from './anonymous-guard.service';

describe('AnonymousGuardService', () => {
  let service: AnonymousGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnonymousGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
