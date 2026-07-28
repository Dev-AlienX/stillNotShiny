import { Injectable, signal, effect } from '@angular/core';
import { Router } from '@angular/router';

const MOCK_USER = {
  username: 'ash',
  password: 'pikachu',
  // A mock base64 encoded JWT token. Payload: { "sub": "1234567890", "name": "Ash Ketchum", "iat": 1516239022 }
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFzaCBLLWNodW0iLCJpYXQiOjE1MTYyMzkwMjJ9.SL7g2eTjBTMlJ1xX4xjQ5l_s9N4j4j8Y_t4i4i4i4i4'
};

const FIVE_MINUTES_MS = 5 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = signal<boolean>(false);
  showLoginPopup = signal<boolean>(false);
  hasInteractedAfterAuthenticationChange = signal<boolean>(false);
  redirectUrl: string | null = null;
  private logoutTimer: any;

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const token = this.getToken();
      this.isAuthenticated.set(!!token);
      this.hasInteractedAfterAuthenticationChange.set(!!token);
    }

    // Effect to handle side-effects when auth state changes
    effect(() => {
      if (typeof localStorage === 'undefined') {
        return;
      }
      if (this.isAuthenticated()) {
        this.showLoginPopup.set(false);
        this.startLogoutTimer();
      } else {
        this.stopLogoutTimer();
      }
    });
  }

  login(username: string, password: string):boolean {
    if (username.toLowerCase() === MOCK_USER.username && password.toLowerCase() === MOCK_USER.password) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('authToken', MOCK_USER.token);
      }
      this.isAuthenticated.set(true);
      this.hasInteractedAfterAuthenticationChange.set(true);
      return true;
    }
    return false;
  }

  logout() {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('authToken');
    }
    this.isAuthenticated.set(false);
    this.hasInteractedAfterAuthenticationChange.set(false);
    // console.log('User has been logged out.'); // Consider using a logging service
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private startLogoutTimer() {
    this.stopLogoutTimer(); // Ensure no multiple timers are running
    this.logoutTimer = setTimeout(() => {
      // console.log('Auto-logout due to inactivity.'); // Consider using a logging service
      this.logout();
    }, FIVE_MINUTES_MS);
  }

  private stopLogoutTimer() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
  }

  resetLogoutTimer() {
    if (this.isAuthenticated()) {
      this.startLogoutTimer();
    }
  }
}
