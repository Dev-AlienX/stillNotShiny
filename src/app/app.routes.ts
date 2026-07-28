import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
    title: 'Home',
  },
  {
    path: 'pokedex',
    loadComponent: () =>
      import('./features/pokedex/pokedex.component').then((m) => m.PokedexComponent),
    title: 'Pokedex',
    canActivate: [authGuard]
  },
  {
    path: 'details/:id',
    loadComponent: () =>
      import('./features/details/details.component').then((m) => m.DetailsComponent),
    title: 'Pokemon Details',
    canActivate: [authGuard]
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Not Found',
  },
];
