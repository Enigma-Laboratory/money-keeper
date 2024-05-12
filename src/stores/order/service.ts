import {
  CreateOneOrderParams,
  DeleteOneOrderParams,
  FindOneOrderParams,
  Order,
  UpdateOneOrderParams,
  UpdateOrderEventParams,
} from '@enigma-laboratory/shared';
import { OrderApiService } from 'services/OrderApiService';
import { arrayToObject } from 'utils';
import { orderStore } from './store';

export class OrderService {
  public static _instance: OrderService;

  public static get instance(): OrderService {
    if (!OrderService._instance) {
      this._instance = new OrderService();
    }
    return this._instance;
  }

  public async fetchAllOrder(): Promise<void> {
    try {
      const { count, rows } = await OrderApiService.instance.fetchAllOrder();
      const orders = arrayToObject('_id', rows);
      orderStore.setModel({ count, rows: orders });
    } catch (error) {
      throw error;
    }
  }

  public async fetchOneOrder(params: FindOneOrderParams): Promise<Order> {
    return await OrderApiService.instance.fetchOneOrder(params);
  }

  public async createOneOrder(params: CreateOneOrderParams): Promise<Order> {
    try {
      const createdOrder = await OrderApiService.instance.createOneOrder(params);
      const { rows: orders, count } = orderStore.getModel();
      orderStore.updateModel({
        count: count + 1,
        rows: { ...orders, [createdOrder._id]: createdOrder },
      });
      return createdOrder;
    } catch (error) {
      throw error;
    }
  }

  public async updateOrderStatus(params: UpdateOrderEventParams): Promise<void> {
    try {
      await OrderApiService.instance.updateOrderStatus(params);
    } catch (error) {
      throw error;
    }
  }

  public async updateOneOrder(params: UpdateOneOrderParams): Promise<void> {
    try {
      const updatedOrder = await OrderApiService.instance.updateOneOrder(params);
      const { count, rows: orders } = orderStore.getModel();

      orders[updatedOrder._id] = updatedOrder;

      orderStore.updateModel({
        count,
        rows: { ...orders },
      });
    } catch (error) {
      throw error;
    }
  }

  public async updateOrderEvent(params: UpdateOrderEventParams): Promise<void> {
    try {
      await OrderApiService.instance.updateOrderStatus(params);
    } catch (error) {
      throw error;
    }
  }

  public async deleteOneOrder(params: DeleteOneOrderParams): Promise<void> {
    try {
      await OrderApiService.instance.deleteOneOrder(params);
      const { rows: orders, count } = orderStore.getModel();
      delete orders?.[params._id];

      orderStore.updateModel({
        count: count - 1,
        rows: { ...orders },
      });
    } catch (error) {
      throw error;
    }
  }

  public createdOrderWithIO(order: Order) {
    orderStore.updateModel((model) => ({
      count: model.count + 1,
      rows: { ...model.rows, [order._id]: order },
    }));
  }

  public updatedOrderWithIO(order: Order) {
    console.log(order);
    orderStore.updateModel((model) => ({
      count: model.count,
      rows: { ...model.rows, [order._id]: order },
    }));
  }

  public deletedOrderWithIO(order: Order) {
    orderStore.updateModel((model) => {
      delete model.rows[order._id];
      return {
        count: model.count - 1,
        rows: { ...model.rows, [order._id]: order },
      };
    });
  }
}
