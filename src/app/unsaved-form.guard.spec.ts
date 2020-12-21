import { TestBed } from '@angular/core/testing';

import { UnsavedFormGuard } from './unsaved-form.guard';

describe('UnsavedFormGuard', () => {
  let guard: UnsavedFormGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnsavedFormGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
