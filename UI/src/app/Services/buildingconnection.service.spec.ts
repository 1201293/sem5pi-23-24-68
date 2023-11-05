import { TestBed } from '@angular/core/testing';

import { BuildingConnectionService } from './buildingconnection.service';

describe('BuildingConnectionService', () => {
  let service: BuildingConnectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildingConnectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
