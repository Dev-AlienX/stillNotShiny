import { HttpContextToken } from '@angular/common/http';

// This token will be used to signal that a request should bypass our logging interceptor.
export const BYPASS_LOGGING = new HttpContextToken<boolean>(() => false);