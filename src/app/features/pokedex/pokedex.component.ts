import { Component, Signal, inject, signal } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs/operators';
import { of, Observable, forkJoin } from 'rxjs';
import { PokeService } from '../../core/services/poke.service';
import { PokeCardComponent } from '../../shared/ui/poke-card/poke-card.component';
import { specialForms } from '../../core/services/pokemon';

interface RegionData {
  regionName: string;
  pokemon: { name: string; url: string }[];
}

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [UpperCasePipe, PokeCardComponent],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.css',
})
export class PokedexComponent {
  pokeService = inject(PokeService);
  route = inject(ActivatedRoute);

  private allPokemonList = new Map<string, Signal<{ name: string; id: number } | null>>();

  queryParams = this.route.queryParams.subscribe((params) => console.log({ params }));

  private readonly regionsWithPokemon$: Observable<RegionData[]> = this.pokeService
    .getMetadataList('region')
    .pipe(
      switchMap((regions) => {
        if (regions.length === 0) {
          return of([]);
        }
        const regionPokemonObservables = regions.map((region) =>
          this.pokeService
            .getPokemonByFilter('region', region)
            .pipe(map((pokemonRes) => ({ regionName: region, pokemon: pokemonRes.results ?? [] }))),
        );
        return forkJoin(regionPokemonObservables);
      }),
    );

  regionsWithPokemon: Signal<RegionData[]> = toSignal(this.regionsWithPokemon$, {
    initialValue: [],
  });

  getPokemonSignal(pokemon: { name: string; url: string }, genOrRegion?: string) {
    if (!this.allPokemonList.has(pokemon.name)) {
      const pokemonSignal = signal<{ name: string; id: number } | null>(null);
      this.allPokemonList.set(pokemon.name, pokemonSignal);

      const name: string = pokemon.name.toLowerCase();
      if (specialForms[name]) {
        const specialnames = specialForms[name];
        specialnames?.forEach((item: any) => {
          if (item.region === genOrRegion && this.allPokemonList.has(pokemon.name)) {
            
          }
        });
      }

      this.pokeService.getPokemonByNameOrId(pokemon.name).subscribe((pokemonDetails) => {
        if (pokemonDetails && pokemonDetails.name && pokemonDetails.id) {
          pokemonSignal.set({
            name: pokemonDetails.name,
            id: pokemonDetails.id,
          });
        } else {
          pokemonSignal.set({
            name: '???',
            id: 0,
          });
        }
      });
    }

    return this.allPokemonList.get(pokemon.name)!;
  }
}
