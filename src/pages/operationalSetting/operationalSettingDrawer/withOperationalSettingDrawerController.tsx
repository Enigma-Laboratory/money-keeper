import { OperationalSetting, Order, UpdateOneOperationalSettingParams } from '@enigma-laboratory/shared';
import { ComponentType } from 'react';
import { UserCollection } from 'stores';
import { OperationalSettingStatusLoading } from '../withOperationalSettingController';

interface PriceByUserPair {
  [userId: string]: number;
}
export interface OperationalSettingData extends OperationalSetting {
  isOpen: boolean;
  orders: Order[];
  statusLoading: OperationalSettingStatusLoading;
  priceByUser: PriceByUserPair;
  users: UserCollection;
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
    const {
      data,
      dispatch: { handleUpdateOrderStatus, closeDrawer },
    } = props;

    const priceByUser: PriceByUserPair = {};

    data.orders?.forEach(({ products, userId }) => {
      const totalPrice: number = products.reduce((acc, { userIds, price }) => {
        userIds.forEach((userId) => (priceByUser[userId] = (priceByUser[userId] ?? 0) + (price / userIds.length) * -1));
        return (acc += price);
      }, 0);
      priceByUser[userId] = (priceByUser[userId] ?? 0) + totalPrice;
    });

    const LogicProps: OperationalSettingProps = {
      data: { ...data, priceByUser },
      dispatch: {
        closeDrawer,
        handleUpdateOrderStatus,
      },
    };
    return <Component {...props} {...LogicProps} />;
  };
};
