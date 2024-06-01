import {
  CreateOneOrderParams,
  DeleteOneOrderParams,
  FindOneOrderParams,
  Order,
  UpdateOneOrderParams,
  UpdateOrderStatusParams,
  User,
} from '@enigma-laboratory/shared';
import { notification } from 'antd';
import { OrderApiService } from 'services';
import { arrayToObject } from 'utils';
import { orderStore } from './store';

export class OrderService {
  private static _instance: OrderService;

  public static get instance(): OrderService {
    if (!OrderService._instance) {
      this._instance = new OrderService();
    }
    return this._instance;
  }

  public async fetchAllOrder(): Promise<void> {
    const { count, rows } = await OrderApiService.instance.fetchAllOrder();
    const orders = arrayToObject('_id', rows);
    orderStore.setModel({ count, rows: orders });
  }

  public async fetchOneOrder(params: FindOneOrderParams): Promise<Order> {
    const fetchedOrder = await OrderApiService.instance.fetchOneOrder(params);
    const { count, rows } = orderStore.getModel();

    const order = rows[fetchedOrder?._id];

    if (order) {
      orderStore.updateModel({
        count,
        rows: { ...rows, [fetchedOrder._id]: fetchedOrder },
      });
    } else {
      orderStore.updateModel({
        count: count + 1,
        rows: { ...rows, [fetchedOrder._id]: fetchedOrder },
      });
    }
    return fetchedOrder;
  }

  public async createOneOrder(params: CreateOneOrderParams): Promise<Order> {
    const createdOrder = await OrderApiService.instance.createOneOrder(params);
    const { rows: orders, count } = orderStore.getModel();
    orderStore.updateModel({
      count: count + 1,
      rows: { ...orders, [createdOrder._id]: createdOrder },
    });
    return createdOrder;
  }

  public async updateOneOrder(params: UpdateOneOrderParams): Promise<Order> {
    const updatedOrder = await OrderApiService.instance.updateOneOrder(params);
    const { count, rows: orders } = orderStore.getModel();

    orders[updatedOrder._id] = updatedOrder;

    orderStore.updateModel({
      count,
      rows: { ...orders },
    });
    return updatedOrder;
  }

  public async updateOrderEvent(params: UpdateOrderStatusParams): Promise<void> {
    await OrderApiService.instance.updateOrderStatus(params);
  }

  public async updateManyOrderStatus(params: { user: User; orders: Order[] }) {
    const { user, orders } = params;
    notification.success({
      message: 'Order updated Successful',
      description: `The orders of ${user.name} has been successfully updated.`,
    });

    const updatedOrders = orders.reduce((acc, order) => ({ ...acc, [order._id]: order }), {} as Record<string, Order>);
    orderStore.updateModel((model) => ({
      count: model.count,
      rows: { ...model.rows, ...updatedOrders },
    }));
  }

  public async deleteOneOrder(params: DeleteOneOrderParams): Promise<void> {
    await OrderApiService.instance.deleteOneOrder(params);
    const { rows: orders, count } = orderStore.getModel();
    delete orders?.[params._id];

    orderStore.updateModel({
      count: count - 1,
      rows: { ...orders },
    });
  }

  public createdOrderWithIO(order: Order) {
    notification.success({
      message: 'Order created Successful',
      description: `The order with id: ${order.name} has been successfully created.`,
    });
    orderStore.updateModel((model) => ({
      count: model.count + 1,
      rows: { ...model.rows, [order._id]: order },
    }));
  }

  public updatedOrderWithIO(order: Order) {
    notification.success({
      message: 'Order updated Successful',
      description: `The order with id: ${order.name} has been successfully updated.`,
    });

    orderStore.updateModel((model) => ({
      count: model.count,
      rows: { ...model.rows, [order._id]: order },
    }));
  }

  public deletedOrderWithIO(order: Order) {
    notification.success({
      message: 'Order deleted Successful',
      description: `The order with id: ${order.name} has been successfully deleted.`,
    });
    orderStore.updateModel((model) => {
      delete model.rows[order._id];
      return {
        count: model.count - 1,
        rows: { ...model.rows, [order._id]: order },
      };
    });
  }
}
