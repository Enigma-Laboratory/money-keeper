import { OperationalSetting, Order, UpdateOneOperationalSettingParams } from '@enigma-laboratory/shared';
import { useFetchInitData } from 'hooks';
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

    const { users } = useFetchInitData();

    const priceByUser: PriceByUserPair = {};

    data.orders?.forEach(({ products, userId }) => {
      const totalPrice: number = products.reduce((acc, { userIds, price }) => {
        userIds.forEach((userId) => (priceByUser[userId] = (priceByUser[userId] ?? 0) + (price / userIds.length) * -1));
        return (acc += price);
      }, 0);
      priceByUser[userId] = (priceByUser[userId] ?? 0) + totalPrice;
    });

    const LogicProps: OperationalSettingProps = {
      data: { ...data, priceByUser, users },
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
