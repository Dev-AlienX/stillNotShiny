import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getToken();

  // Reset timer on every request to keep session alive during activity
  authService.resetLogoutTimer();

  // We only want to intercept requests to the PokeAPI for this example
  if (authToken && req.url.includes('pokeapi.co')) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    // console.log('[Auth Interceptor] Cloned request and added auth token.');
    return next(authReq);
  }

  return next(req);
};
