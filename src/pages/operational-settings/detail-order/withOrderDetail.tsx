import {
  DeleteOneOrderParams,
  FindOneOrderParams,
  Order,
  UpdateOneOrderParams,
  UpdateOrderStatusParams,
} from '@enigma-laboratory/shared';
import { Spin } from 'antd';
import { ComponentType, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useFetchInitData } from 'hooks';
import { OperationalSettingCollection, OrderService, UserCollection } from 'stores';

export interface DetailOrderProps {
  data: {
    isLoading: boolean;
    order: Order;
    users: UserCollection;
    operationalSettings: OperationalSettingCollection;
  };
  dispatch: {
    updateOrder: (params: UpdateOneOrderParams) => Promise<void>;
    deleteOrder: (params: DeleteOneOrderParams) => Promise<void>;
    fetchOrder: (params: FindOneOrderParams) => Promise<void>;
    updateOrderStatus: (params: UpdateOrderStatusParams) => Promise<void>;
  };
}

export const withOrderDetailController = (Component: ComponentType<DetailOrderProps>): ComponentType => {
  return () => {
    const { isLoading, operationalSettings, orders, users } = useFetchInitData();

    const { id } = useParams<{ id: string }>();

    const order = useMemo(() => {
      return orders[id || ''];
    }, [id, orders]);

    const updateOrder = async (params: UpdateOneOrderParams): Promise<void> => {
      await OrderService.instance.updateOneOrder(params);
    };

    const deleteOrder = async (params: DeleteOneOrderParams): Promise<void> => {
      await OrderService.instance.deleteOneOrder(params);
    };

    const fetchOrder = async (params: FindOneOrderParams): Promise<void> => {
      await OrderService.instance.fetchOneOrder(params);
    };

    const updateOrderStatus = async (params: UpdateOrderStatusParams) => {
      return await OrderService.instance.updateOrderEvent(params);
    };

    useEffect(() => {
      fetchOrder({ _id: id || '' });
    }, [id]);

    const logicProps: DetailOrderProps = {
      data: {
        isLoading,
        order,
        users,
        operationalSettings,
      },
      dispatch: {
        updateOrder,
        deleteOrder,
        fetchOrder,
        updateOrderStatus: updateOrderStatus,
      },
    };

    return (
      <Spin spinning={isLoading}>
        <Component {...logicProps} />
      </Spin>
    );
  };
};
