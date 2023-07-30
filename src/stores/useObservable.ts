import { useState, useLayoutEffect } from 'react';
import { BehaviorSubject, Observable } from 'rxjs';

function useObservable<T>(observable: Observable<T>): T {
  const [value, setValue] = useState<T>(() => observable instanceof BehaviorSubject && observable.getValue());

  useLayoutEffect(() => {
    const subscription = observable.subscribe((newValue) => {
      setValue(newValue);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [observable]);

  return value!;
}

export { useObservable };
