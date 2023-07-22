// useObservable.ts
import { useState, useEffect } from "react";
import { Observable, Subscription } from "rxjs";

// Define the generic type for the observable value
type ObservableValue<T> = Observable<T> | null;

const useObservable = <T>(
  observableFactory: () => ObservableValue<T>
): T | null => {
  const [value, setValue] = useState<T | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    const newObservable = observableFactory();

    if (newObservable instanceof Observable) {
      const newSubscription = newObservable.subscribe((newValue) => {
        setValue(newValue);
      });

      setSubscription(newSubscription);
    }

    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [observableFactory, subscription]);

  return value;
};

export { useObservable };
