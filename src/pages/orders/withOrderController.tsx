import { OperationalSetting, Order, UpdateOneOperationalSettingParams } from '@enigma-laboratory/shared';
import { ComponentType, useEffect, useMemo, useState } from 'react';
import { OrderService, orderStore } from 'stores';
import { OperationalSettingService } from 'stores/operationalSettings';
import { useObservable } from 'stores/useObservable';
import { UsersService } from 'stores/user';
import { operationalSettingStore } from './../../stores/operationalSettings/store';

type GroupOrders = { [groupId: string]: Order[] };

export interface OrderProps {
  data: {
    isLoading: boolean;
    isStatusLoading: { id?: string; status: boolean };
    operationalSettings: Record<string, OperationalSetting>;
    groupOrders: GroupOrders;
  };
  dispatch?: {
    fetchAllOrder?: () => Promise<void>;
    handleOnChangeOrderStatus: (params: UpdateOneOperationalSettingParams) => Promise<void>;
  };
}

export const withOrderController = <P,>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isStatusLoading, setIsStatusLoading] = useState<{ id?: string; status: boolean }>({ id: '', status: false });

    const { rows: orders } = useObservable(orderStore.model);
    const { rows: operationalSettings } = useObservable(operationalSettingStore.model);

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

    const handleOnChangeOrderStatus = async (params: UpdateOneOperationalSettingParams) => {
      setIsStatusLoading({ id: params._id, status: true });
      try {
        await OperationalSettingService.instance.updateOneOperationalSetting(params);
      } catch (e: any) {
      } finally {
        setIsStatusLoading({ id: '', status: false });
      }
    };

    const groupedOrders: GroupOrders = useMemo(() => {
      return orders.reduce((acc, order) => {
        const { groupId } = order || {};
        if (groupId) {
          acc[groupId] = [...(acc[groupId] || []), order];
        }
        return acc;
      }, {} as GroupOrders);
    }, [orders]);

    useEffect(() => {
      fetchAllOrder();
    }, []);

    const LogicProps: OrderProps = {
      data: {
        isLoading,
        isStatusLoading,
        groupOrders: groupedOrders,
        operationalSettings,
      },
      dispatch: {
        handleOnChangeOrderStatus,
      },
    };

    return <Component {...props} {...LogicProps} />;
  };
};