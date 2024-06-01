import { OperationalSetting, Order, OrderStatus, UpdateOneOperationalSettingParams } from '@enigma-laboratory/shared';
import { ComponentType } from 'react';
import { OrderApiService } from 'services';
import { AuthService, UserCollection } from 'stores';
import { OperationalSettingStatusLoading } from '../withOperationalSettingController';

interface UserIdObjectPair {
  [userId: string]: { price: number; orderIds: string[] };
}

export interface OperationalSettingData extends OperationalSetting {
  isOpen: boolean;
  orders: Order[];
  statusLoading: OperationalSettingStatusLoading;
  priceByUser: UserIdObjectPair;
  users: UserCollection;
}

export interface OperationalSettingProps {
  data: OperationalSettingData;
  dispatch: {
    closeDrawer: () => void;
    handleUpdateOrderStatus: (params: UpdateOneOperationalSettingParams) => Promise<void>;
    updateOrderStatusByUser?: () => Promise<void>;
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

    const user = AuthService.instance.getAuth();

    const UserIdObj: UserIdObjectPair = {};

    // sum price by userId
    data.orders?.forEach(({ products, userId, _id }) => {
      const totalPrice: number = products.reduce((acc, { userIds, price }) => {
        userIds.forEach((userId) => {
          if (!UserIdObj[userId]) UserIdObj[userId] = { price: 0, orderIds: [] };
          UserIdObj[userId].price = (UserIdObj[userId].price ?? 0) + (price / userIds.length) * -1;
          // collect orderId by me
          if (userId === user._id && !UserIdObj[userId].orderIds.includes(_id)) UserIdObj[userId].orderIds.push(_id); //
        });
        return (acc += price);
      }, 0);
      if (!UserIdObj[userId]) UserIdObj[userId] = { price: 0, orderIds: [] };
      UserIdObj[userId].price = (UserIdObj[userId].price ?? 0) + totalPrice;
    }); //

    const updateOrderStatusByUser = async () => {
      try {
        await OrderApiService.instance.UpdateManyOrderStatus({
          status: OrderStatus.DONE,
          orderIds: UserIdObj[user._id].orderIds,
        });
      } catch (e) {
        console.error(e);
      }
    };

    const LogicProps: OperationalSettingProps = {
      data: { ...data, priceByUser: UserIdObj },
      dispatch: {
        closeDrawer,
        handleUpdateOrderStatus,
        updateOrderStatusByUser,
      },
    };
    return <Component {...props} {...LogicProps} />;
  };
};
