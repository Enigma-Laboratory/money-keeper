import { ComponentType, useState } from 'react';
import {
  CreateOrderParams,
  DeleteOrderParams,
  FindOneOrderParams,
  Order,
  OrderService,
  UpdateOrderParams,
  orderStore,
} from 'stores';
export interface EditOrderProps {
  data: {
    isLoading: boolean;
    orders: Order[];
  };
  dispatch: {
    updateOrder: (params: CreateOrderParams) => Promise<void>;
    deleteOrder: (params: DeleteOrderParams) => Promise<void>;
    fetchOneOrder: (params: FindOneOrderParams) => Promise<Order>;
  };
}

export const withEditOrderController = (Component: ComponentType<EditOrderProps>): ComponentType => {
  return () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { rows: orders } = orderStore.getModel();

    const updateOrder = async (params: UpdateOrderParams): Promise<void> => {
      setIsLoading(true);
      try {
        await OrderService.instance.updateOneOrder(params);
      } finally {
        setIsLoading(false);
      }
    };

    const deleteOrder = async (params: DeleteOrderParams): Promise<void> => {
      setIsLoading(true);
      try {
        await OrderService.instance.deleteOneOrder(params);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchOneOrder = async (params: FindOneOrderParams): Promise<Order> => {
      return await OrderService.instance.fetchOneOrder(params);
    };

    const LogicProps: EditOrderProps = {
      data: {
        isLoading,
        orders,
      },
      dispatch: {
        updateOrder,
        deleteOrder,
        fetchOneOrder,
      },
    };

    return <Component {...LogicProps} />;
  };
};
