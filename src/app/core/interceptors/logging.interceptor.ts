import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';
import { BYPASS_LOGGING } from './interceptor.context';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  // Check if the BYPASS_LOGGING token is set to true in the request's context
  if (req.context.get(BYPASS_LOGGING) === true) {
    // If it is, just pass the request along without logging.
    console.log(`[Logging Interceptor] Bypassing request to: ${req.url}`);
    return next(req);
  }

  // If the token is not set or is false, perform the logging.
  console.log(`[Logging Interceptor] Intercepting request to: ${req.url}`);

  return next(req).pipe(tap(() => console.log(`[Logging Interceptor] Response from: ${req.url}`)));
};