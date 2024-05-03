import { ComponentType, useState } from 'react';
import { CreateOrderParams, OrderService } from 'stores';
export interface CreateOrderProps {
  data?: {
    isLoading: boolean;
  };
  dispatch?: {
    createOrder: (params: CreateOrderParams) => Promise<void>;
  };
}

export const withCreateOrderController = <P,>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const createOrder = async (params: CreateOrderParams): Promise<void> => {
      setIsLoading(true);
      try {
        await OrderService.instance.createOneOrder(params);
      } finally {
        setIsLoading(false);
      }
    };

    const LogicProps: CreateOrderProps = {
      data: {
        isLoading,
      },
      dispatch: {
        createOrder,
      },
    };

    return <Component {...props} {...LogicProps} />;
  };
};
