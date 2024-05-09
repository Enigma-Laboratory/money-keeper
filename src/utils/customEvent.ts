interface IEventAction {
  on: <T = any>(eventName: string, callback: (params: CustomEvent<T>) => void) => void;
  remove: <T = any>(eventName: string, callback: (params: CustomEvent<T>) => void) => void;
  dispatch: <T = any>(eventName: string, payload?: T) => void;
}

const on = <T = any>(eventName: string, callBack: (params: CustomEvent<T>) => void) => {
  window.addEventListener(eventName, callBack as EventListener);
};

const remove = <T = any>(eventName: string, callBack: (params: CustomEvent<T>) => void) => {
  window.removeEventListener(eventName, callBack as EventListener);
};

const dispatch = <T = any>(eventName: string, payload?: T) => {
  window.dispatchEvent(new CustomEvent<T>(eventName, { detail: payload }));
};

export const EventAction: IEventAction = {
  on,
  remove,
  dispatch,
};
