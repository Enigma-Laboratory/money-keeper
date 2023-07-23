import { ComponentType, useEffect, useState } from "react";
import { Order, OrderService, orderStore } from "stores";
import { useObservable } from "stores/useObservable";
import { FindAllResponse } from "interface";
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
    const rows = useObservable(orderStore.getModelObservable());
    console.log(rows);

    // const { rows } = orderStore.getModel();

    const fetchAllOrder = async (): Promise<void> => {
      setIsLoading(true);
      try {
        await OrderService.instance.fetchAllOrder();
      } finally {
        setIsLoading(false);
      }
    };

    // useEffect(() => {
    //   fetchAllOrder();
    // }, []);

    const LogicProps: HomeScreenProps = {
      data: {
        isLoading,
      },
      dispatch: {},
    };

    return <Component {...props} {...LogicProps} />;
  };
};
