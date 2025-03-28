import { TestBed } from '@angular/core/testing';

import { ConflictCheckService } from './conflict-check.service';

describe('ConflictCheckService', () => {
  let service: ConflictCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConflictCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
