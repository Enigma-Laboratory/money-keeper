import { useEffect } from 'react';
import { EventHandler, socket } from 'services';

export const useSocketSubscription = <T>(eventHandlers: EventHandler<T>[]): void => {
  useEffect(() => {
    socket.onEventListeners(eventHandlers);

    return () => {
      socket.offEventListeners(eventHandlers);
    };
  }, [eventHandlers]);
};
