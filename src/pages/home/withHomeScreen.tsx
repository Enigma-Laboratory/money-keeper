import { ComponentType, useEffect, useState } from "react";
import { OrderService, orderStore } from "stores";
import { useObservable } from "stores/useObservable";
export interface HomeScreenProps {
  data: {
    isLoading: boolean;
  };
  dispatch: {
    onFetchUser?: () => Promise<void>;
  };
}

export const withHomeScreenController = <P,>(
  Component: ComponentType<P>
): ComponentType<P> => {
  return (props: P) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { rows, count } = orderStore.getModel();

    const fetchAllOrder = async (): Promise<void> => {
      setIsLoading(true);
      await OrderService.instance.fetchAllOrder();
      try {
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      fetchAllOrder();
    }, []);

    const LogicProps: HomeScreenProps = {
      data: {
        isLoading,
      },
      dispatch: {},
    };

    return <Component {...props} {...LogicProps} />;
  };
};
