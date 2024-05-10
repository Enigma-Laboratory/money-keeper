import { CreateOneOperationalSettingParams, CreateOneOrderParams, Order } from '@enigma-laboratory/shared';
import { useFetchInitData } from 'hooks';
import { ComponentType } from 'react';
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

export const withCreateOrderController = <P,>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
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

    return <Component {...props} {...logicProps} />;
  };
};
