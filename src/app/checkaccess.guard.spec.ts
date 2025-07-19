import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { checkaccessGuard } from './checkaccess.guard';

describe('checkaccessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => checkaccessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
