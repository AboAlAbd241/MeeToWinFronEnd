import { TestBed } from '@angular/core/testing';

import { IntercepterTokenService } from './intercepter-token.service';

describe('IntercepterTokenService', () => {
  let service: IntercepterTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntercepterTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
