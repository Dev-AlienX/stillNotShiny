import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChannelService } from '../../../core/services/channel.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent implements OnInit, OnDestroy {
  private channelService = inject(ChannelService);
  private subscription!: Subscription;

  ngOnInit(): void {
    this.subscription = this.channelService.onWithAck<string, string>('navbar-to-footer').subscribe(({ payload, ack }) => {
      console.log('message recived in footer \\', payload);
      ack('FooterComponent got it!');
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
