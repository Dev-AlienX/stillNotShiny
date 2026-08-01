import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { map, Observable, switchMap, catchError, of } from 'rxjs';
import {
  Pokemon,
  PokemonListResponse,
  EvolutionChain,
} from '../../shared/models/pokemon.interfaces';
import { BYPASS_LOGGING } from '../interceptors/interceptor.context';
import {hisuiPokemon, specialForms}  from '../services/pokemon'

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://pokeapi.co/api/v2';

  // For the Pokedex list
  getPokemonList(limit: number = 20, offset: number = 0) {
    return this.http.get<PokemonListResponse>(
      `${this.baseUrl}/pokemon?limit=${limit}&offset=${offset}`,
    );
  }

  getMetadataList(type: 'type' | 'generation' | 'region') {
    return this.http
      .get<{ results: { name: string }[] }>(`${this.baseUrl}/${type}`)
      .pipe(map((res) => res.results.map((item) => item.name)));
  }

  getPokemonByFilter(
    filterType: 'type' | 'generation' | 'region',
    filterValue: string,
  ): Observable<PokemonListResponse> {
    if (filterType === 'region' && filterValue !== 'hisui' && filterValue !== 'orre') {
      return this.http.get(`${this.baseUrl}/region/${filterValue}`).pipe(
        switchMap((regionResponse: any) => {
          const generationName = regionResponse.main_generation.name;
          return this.getPokemonByFilter('generation', generationName);
        }),
      );
    } else if (filterValue === 'hisui') {
      return of({
        count: hisuiPokemon.length,
        results: hisuiPokemon.map((name) => ({ name, url: `${this.baseUrl}/pokemon/${name}` })),
      });
    } else {
      return this.http.get(`${this.baseUrl}/${filterType}/${filterValue}`).pipe(
        map((response: any) => {
          let results: { name: string; url: string }[] = []; // Initialize results to prevent "used before assigned" error

          switch (filterType) {
            case 'type':
              results = response.pokemon.map(
                (p: { pokemon: { name: string; url: string } }) => p.pokemon,
              );
              break;
            case 'generation':
              results = response.pokemon_species;
              break;
          }

          return {
            count: results.length,
            results: results,
          };
        }),
      );
    }
  }

  private allPokemonCache$!: Observable<PokemonListResponse>;

  private getAllPokemon() {
    if (!this.allPokemonCache$) {
      this.allPokemonCache$ = this.http.get<PokemonListResponse>(
        `${this.baseUrl}/pokemon?limit=10000`,
      );
    }
    return this.allPokemonCache$;
  }

  getPokemon(searchTerm: string): Observable<PokemonListResponse> {
    if (/^\d+$/.test(searchTerm)) {
      return this.getPokemonByNameOrId(searchTerm).pipe(
        map((pokemon) => ({
          count: 1,
          results: [
            {
              name: pokemon.name,
              url: `${this.baseUrl}/pokemon/${pokemon.id}/`,
            },
          ],
        })),
        catchError(() => of({ count: 0, results: [] })),
      );
    }

    return this.getAllPokemon().pipe(
      map((response) => {
        const searchTermLower = searchTerm.toLowerCase();
        let filtered = response.results.filter((p) => p.name.includes(searchTerm.toLowerCase()));

        const exactMatchIndex = filtered.findIndex((p) => p.name === searchTermLower);
        if (exactMatchIndex > 0) {
          const exactMatch = filtered.splice(exactMatchIndex, 1)[0];
          filtered.unshift(exactMatch);
        }

        return {
          count: filtered.length,
          results: filtered.slice(0, 6),
        };
      }),
    );
  }

  // For specific details (Home suggestions & Details page)
  getPokemonByNameOrId(nameOrId: string | number) {
    

    const context = new HttpContext().set(BYPASS_LOGGING, true);

    // if( typeof(nameOrId) == 'string'){
    //   const name:string = nameOrId.toLowerCase();
    //   const specialnames = specialForms[name as keyof typeof specialForms];
    //   specialnames?.forEach((name) => {
       
    //   });
    // }

    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${nameOrId}`, { context });
  }

  getEvolutionChainBySpeciesUrl(speciesUrl: string): Observable<EvolutionChain> {
    return this.http.get<{ evolution_chain: { url: string } }>(speciesUrl).pipe(
      switchMap((speciesData) => {
        return this.http.get<EvolutionChain>(speciesData.evolution_chain.url);
      }),
    );
  }

  getRandomPokemonId(): Observable<number> {
    return this.getPokemonList(1).pipe(
      map((response) => {
        const totalPokemonCount = response.count;
        const randomId = Math.floor(Math.random() * totalPokemonCount) + 1;
        return randomId;
      }),
    );
  }
}
