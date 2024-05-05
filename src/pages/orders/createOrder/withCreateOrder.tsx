import { CreateOneOperationalSettingParams, OperationalSetting, User } from '@enigma-laboratory/shared';
import { ComponentType, useEffect, useState } from 'react';
import { CreateOneOrderParams, OrderService, useObservable } from 'stores';
import { OperationalSettingService, operationalSettingStore } from 'stores/operationalSettings';
import { UsersService, usersStore } from 'stores/user';
export interface CreateOrderProps {
  data?: {
    isLoading: boolean;
    users: User[];
    operationalSettings: OperationalSetting[];
  };
  dispatch?: {
    createOrder: (params: CreateOneOrderParams) => Promise<void>;
    createOperationalSettings: (params: CreateOneOperationalSettingParams) => Promise<void>;
  };
}

export const withCreateOrderController = <P,>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { rows: users } = useObservable(usersStore.model);
    const { rows: operationalSettings } = useObservable(operationalSettingStore.model);

    const createOrder = async (params: CreateOneOrderParams): Promise<void> => {
      await OrderService.instance.createOneOrder(params);
    };

    const fetchInitData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        UsersService.instance.fetchUsers();
        await OperationalSettingService.instance.fetchAllOperationalSetting();
      } finally {
        setIsLoading(false);
      }
    };

    const createOperationalSettings = async (params: CreateOneOperationalSettingParams): Promise<void> => {
      await OperationalSettingService.instance.createOneOperationalSetting(params);
    };

    useEffect(() => {
      fetchInitData();
    }, []);

    const LogicProps: CreateOrderProps = {
      data: {
        isLoading,
        users,
        operationalSettings,
      },
      dispatch: {
        createOrder,
        createOperationalSettings,
      },
    };

    return <Component {...props} {...LogicProps} />;
  };
};
