import { UpdateOneOperationalSettingParams } from '@enigma-laboratory/shared';
import { useFetchInitData } from 'hooks';
import { AlertModalPayload } from 'interfaces';
import { ComponentType, useState } from 'react';
import { OperationalSettingCollection, OperationalSettingService, UserCollection } from 'stores';
import { EVENT_NAME, EventAction } from 'utils';

export interface GroupSettingStatusLoading {
  id?: string;
  status: boolean;
}

export interface GroupsSettingProps {
  data: {
    isLoading: boolean;
    groups: OperationalSettingCollection;
    users: UserCollection;
    statusLoading: GroupSettingStatusLoading;
  };
  dispatch?: {
    updateGroup: (params: UpdateOneOperationalSettingParams) => Promise<void>;
    handleUpdateOrderStatus: (params: UpdateOneOperationalSettingParams) => Promise<void>;
  };
}

export const withGroupsController = <P,>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    const { isLoading, operationalSettings: groups, users } = useFetchInitData();
    const [statusLoading, setStatusLoading] = useState<{ id?: string; status: boolean }>({ id: '', status: false });

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

    const updateGroup = async (params: UpdateOneOperationalSettingParams): Promise<void> => {
      await OperationalSettingService.instance.updateOneOperationalSetting(params);
    };

    const logicProps: GroupsSettingProps = {
      data: {
        isLoading,
        groups,
        users,
        statusLoading,
      },
      dispatch: {
        updateGroup,
        handleUpdateOrderStatus,
      },
    };

    return <Component {...props} {...logicProps} />;
  };
};
