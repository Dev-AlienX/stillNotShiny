import { TestBed } from '@angular/core/testing';

import { PokemonMaster } from './pokemon-master';

describe('PokemonMaster', () => {
  let service: PokemonMaster;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonMaster);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
