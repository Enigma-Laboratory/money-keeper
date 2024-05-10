import { OperationalSetting, Order, UpdateOneOperationalSettingParams } from '@enigma-laboratory/shared';
import { ComponentType } from 'react';
import { OperationalSettingStatusLoading } from '../withOrderController';

export interface IDrawerData extends OperationalSetting {
  isOpen: boolean;
  orders: Order[];
  statusLoading: OperationalSettingStatusLoading;
}

export interface DrawerProps {
  data: IDrawerData;
  dispatch: {
    closeDrawer: () => void;
    handleOnChangeOrderStatus: (params: UpdateOneOperationalSettingParams) => Promise<void>;
  };
}

export const withDrawerController = (Component: ComponentType<DrawerProps>): ComponentType<DrawerProps> => {
  return (props: DrawerProps) => {
    const { data, dispatch } = props;
    const { handleOnChangeOrderStatus } = dispatch;
    const { closeDrawer } = dispatch;
    console.log(data);

    const LogicProps: DrawerProps = {
      data,
      dispatch: {
        closeDrawer,
        handleOnChangeOrderStatus,
      },
    };
    return <Component {...props} {...LogicProps} />;
  };
};
