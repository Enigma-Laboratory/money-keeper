import { ApiServiceEndPoint } from 'services';
import { io, Socket } from 'socket.io-client';
import { DEFAULT_ROOM_NAME } from 'utils';

export interface EventHandler<T = any> {
  [eventName: string]: <K extends T>(params: K) => void;
}

/**
 * SocketIOService provides a wrapper around Socket.IO client functionality
 * to manage socket connections, event handling, and room joining.
 */
class SocketIOService extends ApiServiceEndPoint {
  private socket: Socket | null;

  constructor() {
    super();
    console.log('create many connections');
    this.socket = io(this.endPoint, { autoConnect: true });
  }

  /**
   * Sets up event listeners for the specified event handlers.
   * @param eventHandlers An array of objects containing event names and corresponding handlers.
   * Each handler function receives the data associated with the event.
   */
  onEventListeners<T>(evenHandlers: EventHandler<T>[]): void {
    if (this.socket) {
      evenHandlers.forEach((handlers) => {
        Object.entries(handlers).forEach(([eventName, handler]) => {
          this.socket?.on(eventName, handler);
        });
      });
    }
  }

  /**
   * Removes event listeners for the specified event handlers.
   * @param eventHandlers An array of objects containing event names and corresponding handlers.
   */
  offEventListeners<T>(evenHandlers: EventHandler<T>[]): void {
    if (this.socket) {
      evenHandlers.forEach((handlers) => {
        Object.entries(handlers).forEach(([eventName, handler]) => {
          this.socket?.off(eventName, handler);
        });
      });
    }
  }

  /**
   * Broadcasts an event to all connected sockets.
   * @param eventName The name of the event to broadcast.
   * @param eventData The data to send along with the event.
   * @template T The type of the event data.
   */
  public broadcastEvent<T = any>(eventName: string, eventData: T): void {
    if (this.socket) {
      this.socket.emit(eventName, eventData);
    }
  }

  joinRoom(roomName?: string): void {
    if (this.socket) {
      this.socket.emit('join_room', roomName || DEFAULT_ROOM_NAME);
    }
  }

  disconnectSocket(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socket = new SocketIOService();
