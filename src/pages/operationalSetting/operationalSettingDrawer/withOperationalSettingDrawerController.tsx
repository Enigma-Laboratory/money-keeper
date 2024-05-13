import { OperationalSetting, Order, UpdateOneOperationalSettingParams } from '@enigma-laboratory/shared';
import { ComponentType } from 'react';
import { OperationalSettingStatusLoading } from '../withOperationalSettingController';

export interface OperationalSettingData extends OperationalSetting {
  isOpen: boolean;
  orders: Order[];
  statusLoading: OperationalSettingStatusLoading;
}

export interface OperationalSettingProps {
  data: OperationalSettingData;
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

function calculateTotalPriceByUserId(orders: Order[]): { [key: string]: number } {
  return orders?.reduce(
    (acc, order) => {
      const orderTotalPrice = order.products.reduce((total, product) => total + product.price, 0);

      order.products.forEach((product) => {
        product.userIds.forEach((userId) => {
          acc[userId] = (acc[userId] ?? 0) - product.price / product.userIds.length;
        });
      });

      acc[order.userId] = orderTotalPrice + (acc[order.userId] ?? 0);

      return acc;
    },
    {} as { [key: string]: number },
  );
}
