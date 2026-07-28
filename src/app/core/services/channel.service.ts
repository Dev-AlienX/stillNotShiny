import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * A type-safe, channel-based messaging service for decoupled component communication.
 */
@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private readonly channels = new Map<string, Subject<any>>();

  /**
   * Subscribes to a specific channel to receive simple messages.
   *
   * @template T The expected type of the message payload.
   * @param channelId The unique identifier for the channel.
   * @returns An Observable that emits messages for the specified channel.
   */
  on<T>(channelId: string): Observable<T> {
    return this.getChannel<T>(channelId).asObservable();
  }

  /**
   * Broadcasts a simple message to a specific channel.
   *
   * @template T The type of the message payload.
   * @param channelId The unique identifier for the channel.
   * @param payload The message to broadcast.
   */
  broadcast<T>(channelId: string, payload: T): void {
    this.getChannel<T>(channelId).next(payload);
  }

  /**
   * Broadcasts a message and returns an Observable to receive acknowledgments.
   *
   * @template T The type of the message payload.
   * @template R The expected type of the acknowledgment response.
   * @param channelId The unique identifier for the channel.
   * @param payload The message to broadcast.
   * @returns An Observable that emits acknowledgment responses from subscribers.
   */
  broadcastWithAck<T, R>(channelId: string, payload: T): Observable<R> {
    const ackSubject = new Subject<R>();
    const channel = this.getChannel<{ payload: T; ack: (response: R) => void }>(
      channelId,
    );

    channel.next({
      payload,
      ack: (response: R) => {
        console.log(`ChannelService: Acknowledgment received for channel '${channelId}'`, response);
        ackSubject.next(response);
      },
    });

    return ackSubject.asObservable();
  }

  /**
   * Subscribes to a channel to receive messages that require an acknowledgment.
   *
   * @template T The expected type of the message payload.
   * @template R The type of the acknowledgment response.
   * @param channelId The unique identifier for the channel.
   * @returns An Observable that emits an object containing the payload and an `ack` function.
   */
  onWithAck<T, R>(
    channelId: string,
  ): Observable<{ payload: T; ack: (response: R) => void }> {
    return this.getChannel<{ payload: T; ack: (response: R) => void }>(
      channelId,
    ).asObservable();
  }

  /**
   * Gets or creates a Subject for a given channel ID.
   *
   * @template T The type of the channel's payload.
   * @param channelId The unique identifier for the channel.
   * @returns The Subject associated with the channel.
   */
  private getChannel<T>(channelId: string): Subject<T> {
    if (!this.channels.has(channelId)) {
      this.channels.set(channelId, new Subject<T>());
    }
    return this.channels.get(channelId) as Subject<T>;
  }
}

