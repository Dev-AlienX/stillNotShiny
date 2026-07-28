import { Component, signal, inject, HostListener, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/ui/footer/footer.component';
import { NavbarComponent } from './shared/ui/navbar/navbar.component';
import { LoginComponent } from './shared/ui/login/login.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, FooterComponent, NavbarComponent, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('stillNotShiny');
  authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  private interactionListener!: () => void;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.interactionListener = this.handleInteraction.bind(this);
      document.addEventListener('click', this.interactionListener);
      document.addEventListener('keydown', this.interactionListener);
      document.addEventListener('scroll', this.interactionListener);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('click', this.interactionListener);
      document.removeEventListener('keydown', this.interactionListener);
      document.removeEventListener('scroll', this.interactionListener);
    }
  }

  handleInteraction() {
    if (!this.authService.isAuthenticated() && !this.authService.hasInteractedAfterAuthenticationChange()) {
      this.authService.redirectUrl = this.router.url;
      this.authService.showLoginPopup.set(true);
      this.authService.hasInteractedAfterAuthenticationChange.set(true);
    }
  }
}
