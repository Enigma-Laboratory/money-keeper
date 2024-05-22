interface IEventAction {
  on: <T>(eventName: string, callback: (params: CustomEvent<T>) => void) => void;
  remove: <T>(eventName: string, callback: (params: CustomEvent<T>) => void) => void;
  dispatch: <T>(eventName: string, payload?: T) => void;
}

const on = <T>(eventName: string, callBack: (params: CustomEvent<T>) => void) => {
  window.addEventListener(eventName, callBack as EventListener);
};

const remove = <T>(eventName: string, callBack: (params: CustomEvent<T>) => void) => {
  window.removeEventListener(eventName, callBack as EventListener);
};

const dispatch = <T>(eventName: string, payload?: T) => {
  window.dispatchEvent(new CustomEvent<T>(eventName, { detail: payload }));
};

export const EventAction: IEventAction = {
  on,
  remove,
  dispatch,
};
