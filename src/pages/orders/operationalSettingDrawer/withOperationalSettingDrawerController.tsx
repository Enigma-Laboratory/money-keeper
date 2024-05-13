import { OperationalSetting, Order, UpdateOneOperationalSettingParams } from '@enigma-laboratory/shared';
import { ComponentType } from 'react';
import { OperationalSettingStatusLoading } from '../withOrderController';

export interface IOperationalSettingData extends OperationalSetting {
  isOpen: boolean;
  orders: Order[];
  statusLoading: OperationalSettingStatusLoading;
}

export interface OperationalSettingProps {
  data: IOperationalSettingData;
  dispatch: {
    closeDrawer: () => void;
    handleUpdateOrderStatus: (params: UpdateOneOperationalSettingParams) => Promise<void>;
  };
}

export const withOperationalSettingController = (
  Component: ComponentType<OperationalSettingProps>,
): ComponentType<OperationalSettingProps> => {
  return (props: OperationalSettingProps) => {
    const { data, dispatch } = props;
    const { handleUpdateOrderStatus } = dispatch;
    const { closeDrawer } = dispatch;

    const LogicProps: OperationalSettingProps = {
      data,
      dispatch: {
        closeDrawer,
        handleUpdateOrderStatus,
      },
    };
    return <Component {...props} {...LogicProps} />;
  };
};
