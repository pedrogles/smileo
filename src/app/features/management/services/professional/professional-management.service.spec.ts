import { TestBed } from '@angular/core/testing';

import { ProfessionalManagementService } from './professional-management.service';

describe('ProfessionalManagementService', () => {
  let service: ProfessionalManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionalManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});