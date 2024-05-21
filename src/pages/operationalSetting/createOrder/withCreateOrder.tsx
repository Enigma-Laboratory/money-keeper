import { CreateOneOperationalSettingParams, CreateOneOrderParams, Order } from '@enigma-laboratory/shared';
import { useFetchInitData, useSocketSubscription } from 'hooks';
import { ComponentType } from 'react';
import { operationalSettingEventHandlers, orderEventHandlers } from 'services';
import { OperationalSettingCollection, OperationalSettingService, OrderService } from 'stores';
import { UserCollection } from 'stores/user';
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
    useSocketSubscription([orderEventHandlers, operationalSettingEventHandlers]);
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
