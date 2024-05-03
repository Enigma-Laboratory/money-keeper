import { ComponentType, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  CreateOneOrderParams,
  DeleteOneOrderParams,
  FindOneOrderParams,
  Order,
  UpdateOneOrderParams,
} from '@enigma-laboratory/shared';
import { OrderService, orderStore } from 'stores';

export interface DetailOrderProps {
  data: {
    isLoading: boolean;
    order?: Order;
  };
  dispatch: {
    updateOrder: (params: CreateOneOrderParams) => Promise<void>;
    deleteOrder: (params: DeleteOneOrderParams) => Promise<void>;
    fetchOneOrder: (params: FindOneOrderParams) => Promise<Order>;
  };
}

export const withOrderDetailController = (Component: ComponentType<DetailOrderProps>): ComponentType => {
  return () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [order, setOrder] = useState<Order>();

    const { id } = useParams<{ id: string }>();

    const updateOrder = async (params: UpdateOneOrderParams): Promise<void> => {
      setIsLoading(true);
      try {
        await OrderService.instance.updateOneOrder(params);
      } finally {
        setIsLoading(false);
      }
    };

    const deleteOrder = async (params: DeleteOneOrderParams): Promise<void> => {
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

    const fetchInitData = async (id: string) => {
      const response = await fetchOneOrder({ _id: id });
      setOrder(response);
    };

    // useEffect(() => {
    //   if (!id) return;
    //   fetchInitData(id);
    // }, [id]);

    const LogicProps: DetailOrderProps = {
      data: {
        isLoading,
        order,
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
