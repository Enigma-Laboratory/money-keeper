import {
  DeleteOneOrderParams,
  FindOneOrderParams,
  Order,
  UpdateOneOrderParams,
  UpdateOrderEventParams,
} from '@enigma-laboratory/shared';
import { Spin } from 'antd';
import { useFetchInitData, useSocketSubscription } from 'hooks';
import { ComponentType, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { operationalSettingEventHandlers, orderEventHandlers } from 'services';
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
    updateOrderStatus: (params: UpdateOrderEventParams) => Promise<void>;
  };
}

export const withOrderDetailController = (Component: ComponentType<DetailOrderProps>): ComponentType => {
  return () => {
    useSocketSubscription([orderEventHandlers, operationalSettingEventHandlers]);
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

    const updateOrderStatus = async (params: UpdateOrderEventParams) => {
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
        updateOrderStatus,
      },
    };

    return (
      <Spin spinning={isLoading}>
        <Component {...logicProps} />
      </Spin>
    );
  };
};
