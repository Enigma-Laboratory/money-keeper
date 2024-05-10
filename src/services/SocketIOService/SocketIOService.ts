import { ApiServiceEndPoint } from 'services';
import { io, Socket } from 'socket.io-client';

export class SocketIOService extends ApiServiceEndPoint {
  private static _instance: SocketIOService;
  private socket: Socket | null;

  private constructor() {
    super();
    this.socket = io(this.endPoint);
  }

  static get instance(): SocketIOService {
    if (!SocketIOService._instance) {
      SocketIOService._instance = new SocketIOService();
    }
    return SocketIOService._instance;
  }

  initializeEventListeners(groupEvents: { [key: string]: (value: any) => void }[]): void {
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

  disconnectSocket(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}
