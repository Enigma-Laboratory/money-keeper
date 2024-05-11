import { ApiServiceEndPoint } from 'services';
import { io, Socket } from 'socket.io-client';
import { DEFAULT_ROOM_NAME } from 'utils';

export interface EventHandlers<T = any> {
  [key: string]: <K extends T>(params: K) => void;
}

export class SocketIOService extends ApiServiceEndPoint {
  private socket: Socket | null;

  constructor() {
    super();
    this.socket = io(this.endPoint);
  }

  initializeEventListeners<T>(groupEvents: EventHandlers<T>[]): void {
    if (this.socket) {
      groupEvents.forEach((events) => {
        Object.entries(events).forEach(([event, handler]) => {
          this.socket?.on(event, handler);
        });
      });
    }
  }

  getSocket(): Socket | null {
    return this.socket;
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
