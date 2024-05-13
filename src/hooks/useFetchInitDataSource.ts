import { useCallback, useEffect, useMemo, useState } from 'react';
import { operationalSettingEventHandlers, orderEventHandlers, socket } from 'services';
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

export const useFetchInitData = (): FetchInitDataResult => {
  const { rows: users } = useObservable(usersStore.model);
  const { rows: orders } = useObservable(orderStore.model);
  const { rows: operationalSettings } = useObservable(operationalSettingStore.model);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const hasFetchedAllData = useMemo(() => {
    return !objectIsEmpty(operationalSettings) && !objectIsEmpty(orders) && !objectIsEmpty(users);
  }, [operationalSettings, orders, users]);

  const fetchInitDataSource = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (hasFetchedAllData) return;
      await Promise.all([
        await OperationalSettingService.instance.fetchAllOperationalSetting(),
        await OrderService.instance.fetchAllOrder(),
        await UsersService.instance.fetchUsers(),
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [hasFetchedAllData]);

  useEffect(() => {
    socket.onEventListeners([orderEventHandlers, operationalSettingEventHandlers]);

    return () => {
      socket.offEventListeners([orderEventHandlers, operationalSettingEventHandlers]);
    };
  }, []);

  useEffect(() => {
    fetchInitDataSource();
  }, [fetchInitDataSource]);
  return { isLoading, users, orders, operationalSettings };
};
