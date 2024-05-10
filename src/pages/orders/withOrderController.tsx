import { OperationalSetting, Order, UpdateOneOperationalSettingParams } from '@enigma-laboratory/shared';
import { IAlertModalPayload } from 'components/BaseModal/AlertModal/AlertModal';
import { useFetchInitData } from 'hooks';
import { ComponentType, useMemo, useState } from 'react';
import { OperationalSettingService } from 'stores';
import { EVENT_NAME, EventAction } from 'utils';

type IGroupOrders = { [groupId: string]: Order[] };

export type OperationalSettingStatusLoading = {
  id?: string;
  status: boolean;
};
export interface IOperationalSettingProps {
  data: {
    isLoading: boolean;
    statusLoading: OperationalSettingStatusLoading;
    operationalSettings: Record<string, OperationalSetting>;
    groupOrders: IGroupOrders;
  };
  dispatch: {
    handleOnCloseModal?: () => void;
    handleOnChangeOrderStatus: (params: UpdateOneOperationalSettingParams) => Promise<void>;
  };
}

export const withOrderController = <P,>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    const [statusLoading, setStatusLoading] = useState<{ id?: string; status: boolean }>({ id: '', status: false });

    const { isLoading, operationalSettings, orders } = useFetchInitData();

    const handleOnChangeOrderStatus = async (params: UpdateOneOperationalSettingParams) => {
      setStatusLoading({ id: params._id, status: true });
      try {
        await OperationalSettingService.instance.updateOneOperationalSetting(params);
      } catch (e: any) {
        EventAction.dispatch<IAlertModalPayload>(EVENT_NAME.OPEN_MODAL, { data: { type: 'error', content: 'hello' } });
      } finally {
        setStatusLoading({ id: '', status: false });
      }
    };

    const groupedOrders: IGroupOrders = useMemo(() => {
      return Object.values(orders).reduce((acc, order) => {
        const { groupId } = order || {};
        if (groupId) {
          acc[groupId] = [...(acc[groupId] || []), order];
        }
        return acc;
      }, {} as IGroupOrders);
    }, [orders]);

    const logicProps: IOperationalSettingProps = {
      data: {
        isLoading,
        statusLoading,
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
