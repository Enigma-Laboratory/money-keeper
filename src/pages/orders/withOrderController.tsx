import { OperationalSetting, Order, UpdateOneOperationalSettingParams } from '@enigma-laboratory/shared';
import { IAlertModalPayload } from 'components/BaseModal/AlertModal/AlertModal';
import { useFetchInitData } from 'hooks/useFetchInitDataSource';
import { ComponentType, useMemo, useState } from 'react';
import { OperationalSettingService } from 'stores/operationalSettings';
import { EVENT_NAME, EventAction } from 'utils';

type GroupOrders = { [groupId: string]: Order[] };

export interface OrderProps {
  data: {
    isLoading: boolean;
    isStatusLoading: { id?: string; status: boolean };
    operationalSettings: Record<string, OperationalSetting>;
    groupOrders: GroupOrders;
  };
  dispatch: {
    handleOnCloseModal?: () => void;
    handleOnChangeOrderStatus: (params: UpdateOneOperationalSettingParams) => Promise<void>;
  };
}

export const withOrderController = <P,>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    const [isStatusLoading, setIsStatusLoading] = useState<{ id?: string; status: boolean }>({ id: '', status: false });

    const { isLoading, operationalSettings, orders } = useFetchInitData();

    const handleOnChangeOrderStatus = async (params: UpdateOneOperationalSettingParams) => {
      setIsStatusLoading({ id: params._id, status: true });
      try {
        await OperationalSettingService.instance.updateOneOperationalSetting(params);
      } catch (e: any) {
        EventAction.dispatch<IAlertModalPayload>(EVENT_NAME.OPEN_MODAL, { data: { type: 'error', content: 'hello' } });
      } finally {
        setIsStatusLoading({ id: '', status: false });
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

    const logicProps: OrderProps = {
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

    return <Component {...props} {...logicProps} />;
  };
};
