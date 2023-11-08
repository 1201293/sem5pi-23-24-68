import { TestBed } from '@angular/core/testing';

import {  RobotTypeService } from './robotType.service';

describe('RobotTypeService', () => {
  let service: RobotTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RobotTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
