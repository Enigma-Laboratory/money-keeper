import { useState, useEffect } from "react";
import { Observable, Subscription } from "rxjs"; // You need to install RxJS for this example

// Custom hook to use as a listener for an observable
function useObservable<T>(observable$: Observable<T>): T | null {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const subscription: Subscription = observable$.subscribe((newValue) => {
      setData(newValue);
    });

    // Clean up the subscription when the component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, [observable$]);

  return data;
}

export { useObservable };
