import { Component, signal, inject, HostListener, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/ui/navbar/navbar.component';
import { LoginComponent } from './shared/ui/login/login.component';
import { AuthService } from './core/services/auth.service';
import { PokeService} from "./core/services/poke.service"

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavbarComponent, LoginComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('stillNotShiny');
  authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);
  private pokeService = inject(PokeService);

  private interactionListener!: () => void;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
    this.pokeService.setAllRegions();
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
