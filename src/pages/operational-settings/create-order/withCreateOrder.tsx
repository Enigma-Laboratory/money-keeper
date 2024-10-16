import { CreateOneOperationalSettingParams, CreateOneOrderParams, Order } from '@enigma-laboratory/shared';
import { ComponentType } from 'react';

import { useFetchInitData } from 'hooks';
import { OperationalSettingCollection, OperationalSettingService, OrderService, UserCollection } from 'stores';
export interface CreateOrderProps {
  data: {
    isLoading: boolean;
    users: UserCollection;
    operationalSettings: OperationalSettingCollection;
  };
  dispatch?: {
    createOneOrder: (params: CreateOneOrderParams) => Promise<Order>;
    createOperationalSettings: (params: CreateOneOperationalSettingParams) => Promise<void>;
  };
}

export const withCreateOrderController = (Component: ComponentType<CreateOrderProps>): ComponentType => {
  return () => {
    const { isLoading, operationalSettings, users } = useFetchInitData();

    const createOneOrder = async (params: CreateOneOrderParams): Promise<Order> => {
      return await OrderService.instance.createOneOrder(params);
    };

    const createOperationalSettings = async (params: CreateOneOperationalSettingParams): Promise<void> => {
      await OperationalSettingService.instance.createOneOperationalSetting(params);
    };

    const logicProps: CreateOrderProps = {
      data: {
        isLoading,
        users,
        operationalSettings,
      },
      dispatch: {
        createOneOrder,
        createOperationalSettings,
      },
    };

    return <Component {...logicProps} />;
  };
};
