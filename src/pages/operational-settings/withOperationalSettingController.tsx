import { Order, UpdateOneOperationalSettingParams } from '@enigma-laboratory/shared';

import { useFetchInitData } from 'hooks';
import { AlertModalPayload } from 'interfaces';
import { ComponentType, useMemo, useState } from 'react';
import { OperationalSettingCollection, OperationalSettingService, UserCollection } from 'stores';
import { EVENT_NAME, EventAction } from 'utils';

type GroupOrders = { [groupId: string]: Order[] };

export interface OperationalSettingStatusLoading {
  id?: string;
  status: boolean;
}
export interface OperationalSettingProps {
  data: {
    isLoading: boolean;
    statusLoading: OperationalSettingStatusLoading;
    operationalSettings: OperationalSettingCollection;
    groupOrders: GroupOrders;
    users: UserCollection;
  };
  dispatch: {
    handleOnCloseModal?: () => void;
    handleUpdateOrderStatus: (params: UpdateOneOperationalSettingParams) => Promise<void>;
  };
}

export const withOrderController = <P,>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    const [statusLoading, setStatusLoading] = useState<{ id?: string; status: boolean }>({ id: '', status: false });

    const { isLoading, operationalSettings, orders, users } = useFetchInitData();

    const handleUpdateOrderStatus = async (params: UpdateOneOperationalSettingParams) => {
      setStatusLoading({ id: params._id, status: true });
      try {
        await OperationalSettingService.instance.updateOneOperationalSetting(params);
      } catch (e) {
        EventAction.dispatch<AlertModalPayload>(EVENT_NAME.OPEN_MODAL, { data: { type: 'confirm', content: 'hello' } });
      } finally {
        setStatusLoading({ id: '', status: false });
      }
    };

    const groupedOrders: GroupOrders = useMemo(() => {
      return Object.values(orders).reduce((acc, order) => {
        const { groupId } = order || {};
        if (groupId) {
          acc[groupId] = [...(acc[groupId] || []), order];
        }
        return acc;
      }, {} as GroupOrders);
    }, [orders]);

    const logicProps: OperationalSettingProps = {
      data: {
        isLoading,
        statusLoading,
        groupOrders: groupedOrders,
        operationalSettings,
        users,
      },
      dispatch: {
        handleUpdateOrderStatus,
      },
    };

    return <Component {...props} {...logicProps} />;
  };
};
