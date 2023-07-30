import { ComponentType, useEffect, useState } from "react";
import { Order, OrderService, orderStore } from "stores";
import { useObservable } from "stores/useObservable";
export interface HomeScreenProps {
  data: {
    isLoading: boolean;
    orders: Order[];
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

    const { rows: orders } = useObservable(orderStore.model);

    const fetchAllOrder = async (): Promise<void> => {
      setIsLoading(true);
      try {
        await OrderService.instance.fetchAllOrder();
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
        orders,
      },
      dispatch: {},
    };

    return <Component {...props} {...LogicProps} />;
  };
};
