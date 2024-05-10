import { OperationalSettingEvent, OrderEvent } from '@enigma-laboratory/shared';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SocketIOService } from 'services';
import {
  OperationalSettingCollection,
  OperationalSettingService,
  OrderCollection,
  OrderService,
  UserCollection,
  UsersService,
  operationalSettingStore,
  orderStore,
  useObservable,
  usersStore,
} from 'stores';
import { objectIsEmpty } from 'utils';

interface FetchInitDataResult {
  isLoading: boolean;
  users: UserCollection;
  orders: OrderCollection;
  operationalSettings: OperationalSettingCollection;
}

const orderEventHandlers = {
  [OrderEvent.CREATED]: OrderService.instance.createdOrderWithIO,
  [OrderEvent.UPDATED]: OrderService.instance.updatedOrderWithIO,
  [OrderEvent.DELETED]: OrderService.instance.deletedOrderWithIO,
};

const operationalSettingEventHandlers = {
  [OperationalSettingEvent.CREATED]: OperationalSettingService.instance.createdOperationalSettingIO,
  [OperationalSettingEvent.UPDATED]: OperationalSettingService.instance.updatedOperationalSettingIO,
  [OperationalSettingEvent.DELETED]: OperationalSettingService.instance.deletedOperationalSettingIO,
};

export const useFetchInitData = (): FetchInitDataResult => {
  const { rows: users } = useObservable(usersStore.model);
  const { rows: orders } = useObservable(orderStore.model);
  const { rows: operationalSettings } = useObservable(operationalSettingStore.model);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const hasFetchedDataSource = useMemo(() => {
    return !objectIsEmpty(operationalSettings) || !objectIsEmpty(orders) || !objectIsEmpty(users);
  }, [operationalSettings, orders, users]);

  const fetchInitDataSource = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (hasFetchedDataSource) return;
      await Promise.all([
        await OperationalSettingService.instance.fetchAllOperationalSetting(),
        await OrderService.instance.fetchAllOrder(),
        await UsersService.instance.fetchUsers(),
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [hasFetchedDataSource]);

  useEffect(() => {
    SocketIOService.instance.initializeEventListeners([orderEventHandlers, operationalSettingEventHandlers]);
    return () => {
      SocketIOService.instance.disconnectSocket();
    };
  }, []);

  useEffect(() => {
    fetchInitDataSource();
  }, [fetchInitDataSource]);
  return { isLoading, users, orders, operationalSettings };
};
