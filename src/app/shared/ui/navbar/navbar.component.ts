import { Component, OnDestroy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { PokeService } from '../../../core/services/poke.service';
import { ChannelService } from '../../../core/services/channel.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnDestroy {
  private router = inject(Router);
  public authService = inject(AuthService);
  private pokeService = inject(PokeService);
  private channelService = inject(ChannelService);
  private ackSubscription! : Subscription;

  get isHome() {
    return this.router.url === '/home' || this.router.url === '/';
  }

  get isPokedex() {
    return this.router.url === '/pokedex';
  }

  goToPokedex() {
    this.router.navigate(['/pokedex']);
  }
  goToHome() {
    this.router.navigate(['/home']);
    this.ackSubscription = this.channelService.broadcastWithAck<string, string>('navbar-to-footer', 'message sent from navs')
      .subscribe(ack => {
        console.log('Ack received from a component: ', ack);
      });
  }

  goToRandomPokemon() {
    this.pokeService.getRandomPokemonId().subscribe((id) => {
      this.router.navigate(['/details', id]);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  ngOnDestroy(): void {
    if (this.ackSubscription) {
      this.ackSubscription.unsubscribe();
    }
  }
}

