import {
  CreateOneOperationalSettingParams,
  FindOneOrderParams,
  Order,
  UpdateOneOrderParams,
} from '@enigma-laboratory/shared';
import { ComponentType } from 'react';

import { useFetchInitData } from 'hooks';
import {
  OperationalSettingCollection,
  OperationalSettingService,
  OrderCollection,
  OrderService,
  UserCollection,
} from 'stores';
export interface EditOrderProps {
  data: {
    isLoading: boolean;
    users: UserCollection;
    orders: OrderCollection;
    operationalSettings: OperationalSettingCollection;
  };
  dispatch: {
    updateOneOrder: (params: UpdateOneOrderParams) => Promise<Order>;
    createOperationalSettings: (params: CreateOneOperationalSettingParams) => Promise<void>;
    fetchOneOrder: (params: FindOneOrderParams) => Promise<Order>;
  };
}

export const withEditOrderController = (Component: ComponentType<EditOrderProps>): ComponentType => {
  return () => {
    const { isLoading, operationalSettings, users, orders } = useFetchInitData();

    const updateOneOrder = async (params: UpdateOneOrderParams): Promise<Order> => {
      return await OrderService.instance.updateOneOrder(params);
    };

    const createOperationalSettings = async (params: CreateOneOperationalSettingParams): Promise<void> => {
      await OperationalSettingService.instance.createOneOperationalSetting(params);
    };

    const fetchOneOrder = async (params: FindOneOrderParams): Promise<Order> => {
      return await OrderService.instance.fetchOneOrder(params);
    };

    const logicProps: EditOrderProps = {
      data: {
        isLoading,
        users,
        orders,
        operationalSettings,
      },
      dispatch: {
        updateOneOrder,
        createOperationalSettings,
        fetchOneOrder,
      },
    };

    return <Component {...logicProps} />;
  };
};
