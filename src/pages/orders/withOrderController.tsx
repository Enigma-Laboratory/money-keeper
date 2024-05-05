import { Order } from '@enigma-laboratory/shared';
import { ComponentType, useEffect, useMemo, useState } from 'react';
import { OrderService, orderStore } from 'stores';
import { OperationalSettingService } from 'stores/operationalSettings';
import { useObservable } from 'stores/useObservable';
import { UsersService } from 'stores/user';
import { operationalSettingStore } from './../../stores/operationalSettings/store';

export interface OrderProps {
  data?: {
    isLoading: boolean;
    orders: Order[];
  };
  dispatch?: {
    fetchAllOrder?: () => Promise<void>;
  };
}

export const withOrderController = <P,>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { rows: orders } = useObservable(orderStore.model);
    const { rows: operationalSettings, count } = useObservable(operationalSettingStore.model);

    const fetchAllOrder = async (): Promise<void> => {
      setIsLoading(true);
      try {
        await OrderService.instance.fetchAllOrder();
        await OperationalSettingService.instance.fetchAllOperationalSetting();
        await UsersService.instance.fetchUsers();
      } finally {
        setIsLoading(false);
      }
    };

    const operationalSettingFetch = useMemo(() => {
      return orders.reduce(
        (acc, order) => {
          const { groupId } = order || {};
          if (groupId) {
            acc[groupId] = [...(acc[groupId] || []), order];
          }
          return acc;
        },
        {} as { [groupId: string]: Order[] },
      );
    }, [orders]);

    useEffect(() => {
      fetchAllOrder();
    }, []);

    const LogicProps: OrderProps = {
      data: {
        isLoading,
        orders: orders as any,
      },
      dispatch: {},
    };

    return <Component {...props} {...LogicProps} />;
  };
};
