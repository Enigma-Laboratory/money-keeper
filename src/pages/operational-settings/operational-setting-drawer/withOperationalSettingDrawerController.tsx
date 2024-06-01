import { OperationalSetting, Order, OrderStatus, UpdateOneOperationalSettingParams } from '@enigma-laboratory/shared';
import { AlertModalPayload } from 'interfaces';
import { ComponentType, useState } from 'react';
import { OrderApiService } from 'services';
import { AuthService, UserCollection } from 'stores';
import { EVENT_NAME, EventAction } from 'utils';
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
  isButtonLoading: boolean;
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

    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
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
      setIsButtonLoading(true);
      try {
        await OrderApiService.instance.UpdateManyOrderStatus({
          status: OrderStatus.DONE,
          orderIds: UserIdObj[user._id].orderIds,
        });
      } catch (e) {
        console.error(e);
        EventAction.dispatch<AlertModalPayload>(EVENT_NAME.OPEN_MODAL, {
          data: { type: 'error', content: 'Something wrong in Drawer in Operational Setting' },
        });
      } finally {
        setIsButtonLoading(false);
      }
    };

    const LogicProps: OperationalSettingProps = {
      data: { ...data, isButtonLoading, priceByUser: UserIdObj },
      dispatch: {
        closeDrawer,
        handleUpdateOrderStatus,
        updateOrderStatusByUser,
      },
    };
    return <Component {...props} {...LogicProps} />;
  };
};
