import { TestBed } from '@angular/core/testing';

import { DataModelManager } from './data-model-manager';

describe('DataModelManager', () => {
  let service: DataModelManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataModelManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
